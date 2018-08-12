import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import {
  isSidebarEditActiveSelector,
  sidebarEditChildrenSelector,
} from 'store/selectors/base.selectors';
import { createChildInEdit } from 'store/actions/sidebar.actions';
import { isViewingSharedSector } from 'store/selectors/sector.selectors';

import EntityList from './entity-list';

const mapStateToProps = (state, props) => ({
  isSidebarEditActive: isSidebarEditActiveSelector(state),
  editableEntities: sidebarEditChildrenSelector(state)[props.entityType],
  isShared: isViewingSharedSector(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  createChildInEdit: () => dispatch(createChildInEdit(props.entityType)),
});

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(EntityList),
);
