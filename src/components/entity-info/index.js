import { connect } from 'react-redux';

import { getCurrentSector } from 'store/selectors/sector.selectors';
import { currentSectorSelector } from 'store/selectors/base.selectors';
import {
  getCurrentEntity,
  getCurrentEntityId,
  getCurrentEntityType,
  getCurrentEntityChildren,
} from 'store/selectors/entity.selectors';
import { editSector, deleteSector } from 'store/actions/sector.actions';
import { editSystem } from 'store/actions/system.actions';
import EntityInfo from './entity-info';

const mapStateToProps = state => {
  const sector = getCurrentSector(state);
  return {
    isCloudSave: !!sector.isCloudSave,
    isSaved: !state.sector.generated,
    currentSector: currentSectorSelector(state),
    entity: getCurrentEntity(state),
    entityId: getCurrentEntityId(state),
    entityType: getCurrentEntityType(state),
    entityChildren: getCurrentEntityChildren(state),
  };
};

const mapDispatchToProps = dispatch => ({
  editSectorName: value => dispatch(editSector('name', value)),
  deleteSector: key => dispatch(deleteSector(key)),
  editSystem: system => dispatch(editSystem(system.key, system)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EntityInfo);
