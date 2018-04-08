import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import {
  entityHover,
  entityHold,
  entityRelease,
  topLevelEntityCreate,
} from 'store/actions/sector.actions';
import { moveTopLevelEntity } from 'store/actions/entity.actions';
import { deactivateSidebarEdit } from 'store/actions/sidebar-edit.actions';
import {
  holdKeySelector,
  hoverKeySelector,
  shareSectorSelector,
} from 'store/selectors/base.selectors';
import {
  getCurrentTopLevelEntities,
  getActiveEntityKey,
} from 'store/selectors/entity.selectors';
import HexMap from './hex-map';

const mapStateToProps = state => ({
  holdKey: holdKeySelector(state),
  hoverKey: hoverKeySelector(state),
  activeKey: getActiveEntityKey(state),
  topLevelEntities: getCurrentTopLevelEntities(state),
  isShare: !!shareSectorSelector(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  entityHover: key => dispatch(entityHover(key)),
  entityHold: key => dispatch(entityHold(key)),
  entityRelease: () => dispatch(entityRelease()),
  moveTopLevelEntity: () => dispatch(moveTopLevelEntity(props.intl)),
  topLevelEntityCreate: key => dispatch(topLevelEntityCreate(key)),
  deactivateSidebarEdit: () => dispatch(deactivateSidebarEdit()),
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(HexMap));
