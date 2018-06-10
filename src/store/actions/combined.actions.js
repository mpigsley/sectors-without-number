import { addLocaleData } from 'react-intl';

import { getCurrentUser } from 'store/api/user';
import { getSectorEntities, getSyncedSectors } from 'store/api/entity';
import { getNavigationData } from 'store/api/navigation';
import { getLayerData } from 'store/api/layer';

import {
  isInitializedSelector,
  userUidSelector,
  currentSectorSelector,
} from 'store/selectors/base.selectors';
import { isCurrentSectorFetched } from 'store/selectors/sector.selectors';

import Locale from 'constants/locale';
import Entities from 'constants/entities';
import { mergeEntityUpdates } from 'utils/entity';
import { keys } from 'constants/lodash';

const ACTION_PREFIX = '@@combined';
export const INITIALIZED = `${ACTION_PREFIX}/INITIALIZED`;
export const FETCHED_SECTOR = `${ACTION_PREFIX}/FETCHED_SECTOR`;

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
  ]).then(([{ entities, share }, navigation, layers]) =>
    dispatch({
      type: FETCHED_SECTOR,
      sectorId,
      entities,
      share,
      navigation,
      layers,
    }),
  );
};
