import { connect } from 'react-redux';

import {
  deleteChildInEdit,
  undoDeleteChildInEdit,
  updateChildInEdit,
} from 'store/actions/sidebar-edit.actions';
import { getEmptyHexKeys } from 'store/selectors/sector.selectors';
import EntityEditRow from './entity-edit-row';

const mapStateToProps = state => ({
  emptyHexKeys: getEmptyHexKeys(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  deleteChildInEdit: () =>
    dispatch(deleteChildInEdit(props.entityType, props.entity.entityId)),
  undoDeleteChildInEdit: () =>
    dispatch(undoDeleteChildInEdit(props.entityType, props.entity.entityId)),
  updateChildInEdit: updates =>
    dispatch(
      updateChildInEdit(props.entityType, props.entity.entityId, updates),
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(EntityEditRow);
