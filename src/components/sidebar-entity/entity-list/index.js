import { connect } from 'react-redux';

import {
  isSidebarEditActiveSelector,
  sidebarEditChildrenSelector,
} from 'store/selectors/base.selectors';

import EntityList from './entity-list';

const mapStateToProps = (state, props) => ({
  isSidebarEditActive: isSidebarEditActiveSelector(state),
  editableEntities: sidebarEditChildrenSelector(state)[props.entityType],
});

export default connect(mapStateToProps)(EntityList);
