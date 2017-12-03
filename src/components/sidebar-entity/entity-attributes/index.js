import { connect } from 'react-redux';

import {
  getCurrentEntity,
  getCurrentEntityId,
  getCurrentEntityType,
} from 'store/selectors/entity.selectors';
import { isSidebarEditActiveSelector } from 'store/selectors/base.selectors';
import { updateEntityInEdit } from 'store/actions/sidebar-edit.actions';

import EntityAttributes from './entity-attributes';

const mapStateToProps = state => ({
  entity: getCurrentEntity(state),
  entityId: getCurrentEntityId(state),
  entityType: getCurrentEntityType(state),
  isSidebarEditActive: isSidebarEditActiveSelector(state),
});

export default connect(mapStateToProps, { updateEntityInEdit })(
  EntityAttributes,
);
