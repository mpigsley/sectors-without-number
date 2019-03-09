import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { push } from 'connected-react-router';

import {
  entityHold,
  entityHover,
  clearMapKeys,
  entityRelease,
  topLevelEntityCreate,
} from 'store/actions/sector.actions';
import { moveTopLevelEntity } from 'store/actions/entity.actions';
import { deactivateSidebarEdit } from 'store/actions/sidebar.actions';
import {
  addRouteLocation,
  completeRoute,
  updateNavSettings,
} from 'store/actions/navigation.actions';
import { toggleRegionAtHex } from 'store/actions/layer.actions';

import { isViewingSharedSector } from 'store/selectors/sector.selectors';
import { getCurrentNavigationWithSettings } from 'store/selectors/navigation.selectors';
import {
  holdKeySelector,
  hoverKeySelector,
  isSidebarEditActiveSelector,
  navigationSettingsSelector,
  currentEntityTypeSelector,
  routeLocatorSelector,
  layerRegionPaintSelector,
  settingsShowNumberOfChildren,
  settingsShowEntityName,
  settingsShowCoordinates,
} from 'store/selectors/base.selectors';
import {
  getCurrentTopLevelEntities,
  getActiveEntityKey,
  getMapLock,
  getSectorLayers,
} from 'store/selectors/entity.selectors';
import {
  currentPaintRegion,
  visibleLayerHexColors,
} from 'store/selectors/layer.selectors';
import HexMap from './hex-map';

const mapStateToProps = createStructuredSelector({
  holdKey: holdKeySelector,
  hoverKey: hoverKeySelector,
  activeKey: getActiveEntityKey,
  currentEntityType: currentEntityTypeSelector,
  topLevelEntities: getCurrentTopLevelEntities,
  isShared: isViewingSharedSector,
  isSidebarEditActive: isSidebarEditActiveSelector,
  mapLocked: getMapLock,
  sectorLayers: getSectorLayers,
  navigationSettings: navigationSettingsSelector,
  navigationRoutes: getCurrentNavigationWithSettings,
  routeLocator: routeLocatorSelector,
  paintRegion: currentPaintRegion,
  paintRegionId: layerRegionPaintSelector,
  layerHexes: visibleLayerHexColors,
  showNumberOfChildren: settingsShowNumberOfChildren,
  showEntityName: settingsShowEntityName,
  showCoordinates: settingsShowCoordinates,
});

const mapDispatchToProps = (dispatch, props) => ({
  entityHover: key => dispatch(entityHover(key)),
  entityHold: key => dispatch(entityHold(key)),
  entityRelease: () => dispatch(entityRelease()),
  moveTopLevelEntity: () => dispatch(moveTopLevelEntity(props.intl)),
  topLevelEntityCreate: key => dispatch(topLevelEntityCreate(key)),
  deactivateSidebarEdit: () => dispatch(deactivateSidebarEdit()),
  clearMapKeys: () => dispatch(clearMapKeys()),
  addRouteLocation: key => dispatch(addRouteLocation(key)),
  completeRoute: () => dispatch(completeRoute(props.intl)),
  updateNavSettings: (key, value) => dispatch(updateNavSettings(key, value)),
  toggleRegionAtHex: hexKey => dispatch(toggleRegionAtHex(hexKey)),
  toEntity: (entityType, entityId) => {
    const route = `/sector/${
      props.match.params.sector
    }/${entityType}/${entityId}`;
    if (props.location.pathname !== route) {
      dispatch(push(route));
    }
  },
});

export default injectIntl(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(HexMap),
  ),
);
