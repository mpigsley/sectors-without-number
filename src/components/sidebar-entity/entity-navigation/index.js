import { connect } from 'react-redux';

import { currentSectorSelector } from 'store/selectors/base.selectors';
import {
  getCurrentEntity,
  getCurrentEntityType,
} from 'store/selectors/entity.selectors';

import { saveSector } from 'store/actions/sector.actions';
import EntityNavigation from './entity-navigation';

const mapStateToProps = state => ({
  isSaved: false,
  isSynced: !!state.user.model,
  isCloudSave: false,
  currentSector: currentSectorSelector(state),
  entity: getCurrentEntity(state),
  entityType: getCurrentEntityType(state),
});

export default connect(mapStateToProps, { saveSector })(EntityNavigation);
