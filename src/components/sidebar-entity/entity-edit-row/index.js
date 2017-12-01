import { connect } from 'react-redux';

import {
  deleteEntityInEdit,
  undoDeleteEntityInEdit,
  updateEntityInEdit,
} from 'store/actions/sector.actions';
import EntityEditRow from './entity-edit-row';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, props) => ({
  deleteEntityInEdit: () =>
    dispatch(deleteEntityInEdit(props.entityType, props.entity.entityId)),
  undoDeleteEntityInEdit: () =>
    dispatch(undoDeleteEntityInEdit(props.entityType, props.entity.entityId)),
  updateEntityInEdit: updates =>
    dispatch(
      updateEntityInEdit(props.entityType, props.entity.entityId, updates),
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(EntityEditRow);
