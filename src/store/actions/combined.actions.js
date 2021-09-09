import { addLocaleData } from 'react-intl';
import { push } from 'connected-react-router';
import Firebase from 'firebase/app';

import { getCurrentUser } from 'store/api/user';
import { getCustomTags } from 'store/api/tag';
import {
  getSectorEntities,
  getSyncedSectors,
  updateEntity,
} from 'store/api/entity';
import { getNavigationData, updateRoutes } from 'store/api/navigation';
import {
  getLayerData,
  createLayer,
  deleteLayer,
  updateLayers,
} from 'store/api/layer';
import { getFactionData } from 'store/api/faction';

import {
  isInitializedSelector,
  userUidSelector,
  currentSectorSelector,
  currentEntitySelector,
  navigationRoutesSelector,
  routerLocationSelector,
} from 'store/selectors/base.selectors';
import { isCurrentSectorFetched } from 'store/selectors/sector.selectors';
import { currentSectorLayers } from 'store/selectors/layer.selectors';
import {
  getSectorLayers,
  getCurrentSector,
  getCurrentTopLevelEntities,
} from 'store/selectors/entity.selectors';
import { releaseSyncLock } from 'store/actions/sector.actions';

import Locale from 'constants/locale';
import Entities from 'constants/entities';
import { MAX_DIMENSION } from 'constants/defaults';
import { mergeEntityUpdates, saveEntities, preventSync } from 'utils/entity';

import { SuccessToast, ErrorToast } from 'utils/toasts';
import { coordinatesFromKey, coordinateKey } from 'utils/common';
import {
  keys,
  mapKeys,
  mapValues,
  omit,
  reduce,
  zipObject,
} from 'constants/lodash';

const ACTION_PREFIX = '@@combined';
export const INITIALIZED = `${ACTION_PREFIX}/INITIALIZED`;
export const FETCHED_SECTOR = `${ACTION_PREFIX}/FETCHED_SECTOR`;
export const CREATED_LAYER = `${ACTION_PREFIX}/CREATED_LAYER`;
export const DELETED_LAYER = `${ACTION_PREFIX}/DELETED_LAYER`;
export const EXPAND_SECTOR = `${ACTION_PREFIX}/EXPAND_SECTOR`;

export const initialize = () => async (dispatch, getState) => {
  const state = getState();
  const location = routerLocationSelector(state);
  const sectorId = location.pathname.split('/')[2];
  const isGameView =
    location.pathname.startsWith('/sector/') ||
    location.pathname.startsWith('/overview/') ||
    location.pathname.startsWith('/elements/');

  const user = await getCurrentUser();
  const { uid, locale } = user || {};

  let userLocale;
  if (locale && locale !== 'en' && Locale[locale]) {
    const [localeObj, localeData] = await Locale[locale].localeFetch();
    addLocaleData(localeData.default);
    userLocale = localeObj.default;
  }

  let share;
  let entities;
  let routes = {};
  let layers = {};
  let factions = {};
  if (isGameView) {
    [{ entities, share }, routes, layers] = await Promise.all([
      getSectorEntities(sectorId, uid),
      getNavigationData(sectorId),
      getLayerData(sectorId),
    ]);

    if (!share && entities) {
      factions = await getFactionData(sectorId);
    }
  }

  const sectorData = ((entities || {})[Entities.sector.key] || {})[sectorId];
  if (sectorData) {
    document.title = `Sector - ${sectorData.name}`;
  }

  let sectors = {};
  let tags = {};
  if (uid) {
    [sectors, tags] = await Promise.all([
      getSyncedSectors(uid),
      getCustomTags(uid),
    ]);
  }

  const sectorCreator = (sectorData || {}).creator;
  if (sectorCreator && (!uid || sectorCreator !== uid)) {
    const nonUserTags = await getCustomTags(sectorCreator);
    tags = { ...tags, ...nonUserTags };
  }

  dispatch({
    type: INITIALIZED,
    user,
    tags,
    entities: mergeEntityUpdates(
      { [Entities.sector.key]: sectors },
      entities || {},
    ),
    routes,
    layers,
    factions,
    sectorId,
    share,
    saved: keys(sectors),
    locale: userLocale,
  });
};

export const fetchSector = () => async (dispatch, getState) => {
  const state = getState();
  const sectorId = currentSectorSelector(state);

  const currentSector = getCurrentSector(state);
  if (currentSector) {
    document.title = `Sector - ${currentSector.name}`;
  }

  if (!isInitializedSelector(state) || isCurrentSectorFetched(state)) {
    return;
  }

  const userId = userUidSelector(state);
  const [{ entities, share }, routes, layers] = await Promise.all([
    getSectorEntities(sectorId, userId),
    getNavigationData(sectorId),
    getLayerData(sectorId),
  ]);

  let factions = {};
  if (!share && entities) {
    factions = await getFactionData(sectorId);
  }

  dispatch({
    type: FETCHED_SECTOR,
    sectorId,
    entities,
    share,
    routes,
    layers,
    factions,
  });
};

export const addLayer = (model, intl) => (dispatch, getState) => {
  const state = getState();
  const sectorId = currentSectorSelector(state);
  return createLayer(sectorId, model).then(({ layerId, layer }) => {
    const sectorLayers = getSectorLayers(state);
    const currentLayerIds = keys(currentSectorLayers(state));
    const layers = {
      ...sectorLayers,
      ...zipObject(
        currentLayerIds,
        currentLayerIds.map(() => false),
      ),
      [layerId]: true,
    };
    return updateEntity(sectorId, Entities.sector.key, { layers })
      .then(() => {
        dispatch(
          SuccessToast({
            title: intl.formatMessage({ id: 'misc.sectorSaved' }),
            message: intl.formatMessage({ id: 'misc.yourSectorSaved' }),
          }),
        );
        dispatch({ type: CREATED_LAYER, sectorId, layerId, layer, layers });
        dispatch(push(`/sector/${sectorId}/layer/${layerId}`));
      })
      .catch((err) => {
        console.error(err);
        dispatch(
          ErrorToast({
            title: intl.formatMessage({ id: 'misc.error' }),
            message: intl.formatMessage({ id: 'misc.reportProblemPersists' }),
          }),
        );
      });
  });
};

export const removeLayer = (intl) => (dispatch, getState) => {
  const state = getState();
  const sectorId = currentSectorSelector(state);
  const layerId = currentEntitySelector(state);
  const layers = omit(getSectorLayers(state), layerId);
  return Promise.all([
    deleteLayer(sectorId, layerId),
    updateEntity(sectorId, Entities.sector.key, {
      layers: { [layerId]: Firebase.firestore.FieldValue.delete() },
    }),
  ])
    .then(() => {
      dispatch(
        SuccessToast({
          title: intl.formatMessage({ id: 'misc.sectorSaved' }),
          message: intl.formatMessage({ id: 'misc.yourSectorSaved' }),
        }),
      );
      dispatch(push(`/sector/${sectorId}`));
      dispatch({ type: DELETED_LAYER, sectorId, layerId, layers });
    })
    .catch((err) => {
      console.error(err);
      dispatch(
        ErrorToast({
          title: intl.formatMessage({ id: 'misc.error' }),
          message: intl.formatMessage({ id: 'misc.reportProblemPersists' }),
        }),
      );
    });
};

export const expandSector =
  ({ top, left, right, bottom }, intl) =>
  (dispatch, getState) => {
    const state = getState();
    const sector = getCurrentSector(state);
    const isValid =
      sector.columns + (left || 0) + (right || 0) <= MAX_DIMENSION &&
      sector.rows + (top || 0) + (bottom || 0) <= MAX_DIMENSION;
    if (dispatch(preventSync(intl)) || !isValid) {
      return Promise.resolve();
    }
    const sectorId = currentSectorSelector(state);
    const routes = navigationRoutesSelector(state);
    const columns = sector.columns + left + right;
    const rows = sector.rows + top + bottom;

    let updatedTopLevel = {};
    let updatedRoutes = routes[sectorId];
    let updatedLayers = currentSectorLayers(state);
    const sectorUpdate = {
      [Entities.sector.key]: {
        [sectorId]: { columns, rows },
      },
    };

    if (top || left) {
      const topLevelEntities = getCurrentTopLevelEntities(state);
      updatedTopLevel = reduce(
        topLevelEntities,
        (entities, { x, y, ...entity }, entityId) => ({
          ...entities,
          [entity.type]: {
            ...(entities[entity.type] || {}),
            [entityId]: { ...entity, x: x + left, y: y + top },
          },
        }),
        {},
      );

      if (updatedRoutes) {
        updatedRoutes = mapValues(
          updatedRoutes,
          ({ route, ...navigation }) => ({
            ...navigation,
            route: route.map((key) => {
              const { x, y } = coordinatesFromKey(key);
              return coordinateKey(x + left, y + top);
            }),
          }),
        );
      }

      updatedLayers = mapValues(updatedLayers, ({ hexes, ...layer }) => ({
        ...layer,
        hexes: mapKeys(hexes, (value, key) => {
          const { x, y } = coordinatesFromKey(key);
          return coordinateKey(x + left, y + top);
        }),
      }));
    }

    const entities = { ...sectorUpdate, ...updatedTopLevel };
    dispatch({
      type: EXPAND_SECTOR,
      sectorId,
      routes: updatedRoutes,
      layers: updatedLayers,
      entities,
    });

    return Promise.all([
      saveEntities({ state, updated: entities }, intl),
      dispatch(releaseSyncLock()),
      updateLayers(sectorId, updatedLayers),
      updateRoutes(sectorId, updatedRoutes),
    ]).then(([{ action }]) => {
      if (action) {
        dispatch(action);
      }
    });
  };
