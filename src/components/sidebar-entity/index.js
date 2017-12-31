import { connect } from 'react-redux';

import {
  getCurrentEntity,
  getCurrentEntityType,
  getCurrentEntityChildren,
} from 'store/selectors/entity.selectors';
import { isSidebarEditActiveSelector } from 'store/selectors/base.selectors';

import { deleteEntity } from 'store/actions/entity.actions';

import SidebarEntity from './sidebar-entity';

const mapStateToProps = state => ({
  entity: getCurrentEntity(state),
  entityType: getCurrentEntityType(state),
  entityChildren: getCurrentEntityChildren(state),
  isSidebarEditActive: isSidebarEditActiveSelector(state),
});

export default connect(mapStateToProps, {
  deleteEntity,
})(SidebarEntity);
