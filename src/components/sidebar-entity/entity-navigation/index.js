import { connect } from 'react-redux';

import {
  userModelSelector,
  currentSectorSelector,
  isSidebarEditActiveSelector,
} from 'store/selectors/base.selectors';
import { isCurrentSectorSaved } from 'store/selectors/sector.selectors';
import {
  getCurrentEntity,
  getCurrentEntityType,
} from 'store/selectors/entity.selectors';

import {
  saveEntityEdit,
  deleteEntity,
  saveSector,
} from 'store/actions/entity.actions';
import {
  activateSidebarEdit,
  deactivateSidebarEdit,
} from 'store/actions/sidebar-edit.actions';
import EntityNavigation from './entity-navigation';

const mapStateToProps = state => ({
  isSaved: isCurrentSectorSaved(state),
  isSynced: !!userModelSelector(state),
  isCloudSave: false,
  currentSector: currentSectorSelector(state),
  entity: getCurrentEntity(state),
  entityType: getCurrentEntityType(state),
  isSidebarEditActive: isSidebarEditActiveSelector(state),
});

export default connect(mapStateToProps, {
  activateSidebarEdit,
  deactivateSidebarEdit,
  saveEntityEdit,
  deleteEntity,
  saveSector,
})(EntityNavigation);
