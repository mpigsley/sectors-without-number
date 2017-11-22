import { connect } from 'react-redux';

import { currentSectorSelector } from 'store/selectors/base.selectors';
import {
  getCurrentEntity,
  getCurrentEntityId,
  getCurrentEntityType,
  getCurrentEntityChildren,
} from 'store/selectors/entity.selectors';

import { updateEntity, deleteEntity } from 'store/actions/entity.actions';

import EntityInfo from './entity-info';

const mapStateToProps = state => ({
  isCloudSave: false,
  isSaved: false,
  currentSector: currentSectorSelector(state),
  entity: getCurrentEntity(state),
  entityId: getCurrentEntityId(state),
  entityType: getCurrentEntityType(state),
  entityChildren: getCurrentEntityChildren(state),
});

export default connect(mapStateToProps, {
  updateEntity,
  deleteEntity,
})(EntityInfo);
