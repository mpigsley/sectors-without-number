import { addLocaleData } from 'react-intl';
import { push } from 'react-router-redux';

import { getCurrentUser } from 'store/api/user';
import {
  getSectorEntities,
  getSyncedSectors,
  updateEntity,
} from 'store/api/entity';
import { getNavigationData } from 'store/api/navigation';
import { getLayerData, createLayer } from 'store/api/layer';

import {
  isInitializedSelector,
  userUidSelector,
  currentSectorSelector,
} from 'store/selectors/base.selectors';
import { isCurrentSectorFetched } from 'store/selectors/sector.selectors';
import { currentSectorLayers } from 'store/selectors/layer.selectors';
import { getSectorLayers } from 'store/selectors/entity.selectors';

import Locale from 'constants/locale';
import Entities from 'constants/entities';
import { mergeEntityUpdates } from 'utils/entity';
import { zipObject, keys } from 'constants/lodash';

const ACTION_PREFIX = '@@combined';
export const INITIALIZED = `${ACTION_PREFIX}/INITIALIZED`;
export const FETCHED_SECTOR = `${ACTION_PREFIX}/FETCHED_SECTOR`;
export const CREATED_LAYER = `${ACTION_PREFIX}/CREATED_LAYER`;

export const initialize = location => dispatch =>
  getCurrentUser().then(user => {
    const { uid, locale } = user || {};
    const sectorId = location.pathname.split('/')[2];
    const isGameView =
      location.pathname.startsWith('/sector') ||
      location.pathname.startsWith('/overview');
    const promises = [
      isGameView ? getSectorEntities(sectorId, uid) : Promise.resolve({}),
      isGameView ? getNavigationData(sectorId) : Promise.resolve({}),
      isGameView ? getLayerData(sectorId) : Promise.resolve({}),
      uid ? getSyncedSectors(uid) : Promise.resolve(),
    ];
    if (locale && locale !== 'en' && Locale[locale]) {
      promises.push(
        Locale[locale].localeFetch().then(([userLocale, localeData]) => {
          addLocaleData(localeData);
          return userLocale;
        }),
      );
    }
    return Promise.all(promises).then(
      ([{ entities, share }, routes, layers, sectors, userLocale]) =>
        dispatch({
          type: INITIALIZED,
          user,
          entities: mergeEntityUpdates(
            { [Entities.sector.key]: sectors },
            entities || {},
          ),
          routes,
          layers,
          sectorId,
          share,
          saved: keys(sectors || {}),
          locale: userLocale,
        }),
    );
  });

export const fetchSector = () => (dispatch, getState) => {
  const state = getState();
  const sectorId = currentSectorSelector(state);
  if (!isInitializedSelector(state) || isCurrentSectorFetched(state)) {
    return Promise.resolve();
  }
  const userId = userUidSelector(state);
  return Promise.all([
    getSectorEntities(sectorId, userId),
    getNavigationData(sectorId),
    getLayerData(sectorId),
  ]).then(([{ entities, share }, routes, layers]) =>
    dispatch({
      type: FETCHED_SECTOR,
      sectorId,
      entities,
      share,
      routes,
      layers,
    }),
  );
};

export const addLayer = model => (dispatch, getState) => {
  const state = getState();
  const sectorId = currentSectorSelector(state);
  console.log(sectorId, model);
  return createLayer(sectorId, model).then(({ layerId, layer }) => {
    const sectorLayers = getSectorLayers(state);
    const currentLayerIds = keys(currentSectorLayers(state));
    const layers = {
      ...sectorLayers,
      ...zipObject(currentLayerIds, currentLayerIds.map(() => false)),
      [layerId]: true,
    };
    return updateEntity(sectorId, Entities.sector.key, { layers }).then(() => {
      dispatch({ type: CREATED_LAYER, sectorId, layerId, layer, layers });
      dispatch(push(`/sector/${sectorId}/layer/${layerId}`));
    });
  });
};
