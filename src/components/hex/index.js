import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

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

const mapDispatchToProps = (dispatch, props) => ({
  entityHoverStart: key => dispatch(entityHoverStart(key)),
  entityHoverEnd: key => dispatch(entityHoverEnd(key)),
  entityHold: key => dispatch(entityHold(key)),
  entityRelease: () => dispatch(entityRelease()),
  moveTopLevelEntity: () => dispatch(moveTopLevelEntity(props.intl)),
  topLevelEntityCreate: key => dispatch(topLevelEntityCreate(key)),
  deactivateSidebarEdit: () => dispatch(deactivateSidebarEdit()),
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Hex));
