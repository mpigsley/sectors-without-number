import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import {
  currentSectorSelector,
  isSidebarEditActiveSelector,
} from 'store/selectors/base.selectors';
import {
  isCurrentSectorSaved,
  isViewingSharedSector,
} from 'store/selectors/sector.selectors';
import {
  getCurrentEntity,
  getCurrentEntityType,
  getCurrentEntityChildren,
} from 'store/selectors/entity.selectors';

import {
  saveEntityEdit,
  saveSector,
  deleteEntity,
} from 'store/actions/entity.actions';
import {
  activateSidebarEdit,
  deactivateSidebarEdit,
} from 'store/actions/sidebar.actions';
import { openSectorExpansion } from 'store/actions/sector.actions';

import EntityActions from './entity-actions';

const mapStateToProps = (state) => ({
  isSaved: isCurrentSectorSaved(state),
  isShared: isViewingSharedSector(state),
  currentSector: currentSectorSelector(state),
  entity: getCurrentEntity(state),
  entityType: getCurrentEntityType(state),
  isSidebarEditActive: isSidebarEditActiveSelector(state),
  entityChildren: getCurrentEntityChildren(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  activateSidebarEdit: () => dispatch(activateSidebarEdit()),
  deactivateSidebarEdit: () => dispatch(deactivateSidebarEdit()),
  saveEntityEdit: () => dispatch(saveEntityEdit(props.intl)),
  saveSector: () => dispatch(saveSector(props.intl)),
  deleteEntity: () => dispatch(deleteEntity(props.intl)),
  openSectorExpansion: () => dispatch(openSectorExpansion()),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(EntityActions),
);
