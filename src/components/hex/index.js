import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import {
  entityHoverStart,
  entityHoverEnd,
  entityHold,
  entityRelease,
  topLevelEntityCreate,
} from 'store/actions/sector.actions';
import { moveTopLevelEntity } from 'store/actions/entity.actions';
import { deactivateSidebarEdit } from 'store/actions/sidebar-edit.actions';
import {
  holdKeySelector,
  hoverKeySelector,
} from 'store/selectors/base.selectors';
import { getCurrentTopLevelEntities } from 'store/selectors/entity.selectors';

import Hex from './hex';

const mapStateToProps = state => ({
  topLevelEntities: getCurrentTopLevelEntities(state),
  holdKey: holdKeySelector(state),
  hoverKey: hoverKeySelector(state),
  isCloudSave: false,
});

const mapDispatchToProps = dispatch => ({
  toRoute: route => dispatch(push(route)),
  entityHoverStart: hexKey => dispatch(entityHoverStart(hexKey)),
  entityHoverEnd: hexKey => dispatch(entityHoverEnd(hexKey)),
  entityHold: hexKey => dispatch(entityHold(hexKey)),
  entityRelease: () => dispatch(entityRelease()),
  moveTopLevelEntity: () => dispatch(moveTopLevelEntity()),
  topLevelEntityCreate: hexKey => dispatch(topLevelEntityCreate(hexKey)),
  deactivateSidebarEdit: () => dispatch(deactivateSidebarEdit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Hex);
