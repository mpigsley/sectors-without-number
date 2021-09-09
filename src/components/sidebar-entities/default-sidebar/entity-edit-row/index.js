import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import {
  deleteChildInEdit,
  undoDeleteChildInEdit,
  updateChildInEdit,
} from 'store/actions/sidebar.actions';
import {
  isCurrentOrAncestorHidden,
  getEmptyHexKeys,
} from 'store/selectors/entity.selectors';
import EntityEditRow from './entity-edit-row';

const mapStateToProps = (state) => ({
  emptyHexKeys: getEmptyHexKeys(state),
  isCurrentOrAncestorHidden: isCurrentOrAncestorHidden(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  deleteChildInEdit: () =>
    dispatch(deleteChildInEdit(props.entityType, props.entity.entityId)),
  undoDeleteChildInEdit: () =>
    dispatch(undoDeleteChildInEdit(props.entityType, props.entity.entityId)),
  updateChildInEdit: (updates) =>
    dispatch(
      updateChildInEdit(props.entityType, props.entity.entityId, updates),
    ),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(EntityEditRow),
);
