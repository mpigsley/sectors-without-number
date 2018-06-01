import { addLocaleData } from 'react-intl';

import { getCurrentUser } from 'store/api/user';
import { getSectorEntities, getSyncedSectors } from 'store/api/entity';
import { getNavigationData } from 'store/api/navigation';

import { fetchSectorEntities } from 'store/actions/entity.actions';
import { fetchNavigation } from 'store/actions/navigation.actions';

import { currentSectorSelector } from 'store/selectors/base.selectors';

import Locale from 'constants/locale';
import Entities from 'constants/entities';
import { mergeEntityUpdates } from 'utils/entity';
import { keys } from 'constants/lodash';

const ACTION_PREFIX = '@@combined';
export const INITIALIZED = `${ACTION_PREFIX}/INITIALIZED`;

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
      ([current, routes, sectors, userLocale]) =>
        dispatch({
          type: INITIALIZED,
          user,
          entities: mergeEntityUpdates(
            { [Entities.sector.key]: sectors },
            current.entities || {},
          ),
          routes,
          sectorId: current.sectorId,
          share: current.share,
          saved: keys(sectors || {}),
          locale: userLocale,
        }),
    );
  });

export const enterGameRoute = () => (dispatch, getState) => {
  const state = getState();
  const sector = currentSectorSelector(state);
  return Promise.all([
    dispatch(fetchSectorEntities(sector)),
    dispatch(fetchNavigation(sector)),
  ]);
};
