import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import {
  entityHold,
  entityHover,
  clearMapKeys,
  entityRelease,
  topLevelEntityCreate,
} from 'store/actions/sector.actions';
import { moveTopLevelEntity } from 'store/actions/entity.actions';
import { deactivateSidebarEdit } from 'store/actions/sidebar-edit.actions';
import {
  holdKeySelector,
  hoverKeySelector,
  isSharedSectorSelector,
  isSidebarEditActiveSelector,
} from 'store/selectors/base.selectors';
import {
  getCurrentTopLevelEntities,
  getActiveEntityKey,
  getMapLock,
  getLayers,
} from 'store/selectors/entity.selectors';
import HexMap from './hex-map';

const mapStateToProps = createStructuredSelector({
  holdKey: holdKeySelector,
  hoverKey: hoverKeySelector,
  activeKey: getActiveEntityKey,
  topLevelEntities: getCurrentTopLevelEntities,
  isShare: isSharedSectorSelector,
  isSidebarEditActive: isSidebarEditActiveSelector,
  mapLocked: getMapLock,
  layers: getLayers,
});

const mapDispatchToProps = (dispatch, props) => ({
  entityHover: key => dispatch(entityHover(key)),
  entityHold: key => dispatch(entityHold(key)),
  entityRelease: () => dispatch(entityRelease()),
  moveTopLevelEntity: () => dispatch(moveTopLevelEntity(props.intl)),
  topLevelEntityCreate: key => dispatch(topLevelEntityCreate(key)),
  deactivateSidebarEdit: () => dispatch(deactivateSidebarEdit()),
  clearMapKeys: () => dispatch(clearMapKeys()),
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(HexMap));
