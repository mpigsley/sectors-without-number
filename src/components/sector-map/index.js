import { connect } from 'react-redux';

import Entities from 'constants/entities';
import { generateEntity } from 'store/actions/entity.actions';
import {
  getCurrentTopLevelEntities,
  getCurrentSector,
} from 'store/selectors/entity.selectors';
import {
  renderSectorSelector,
  isDropdownActiveSelector,
  isInitializedSelector,
} from 'store/selectors/base.selectors';
import { closeUserDropdown } from 'store/actions/user.actions';

import SectorMap from './sector-map';

const mapStateToProps = state => ({
  renderSector: renderSectorSelector(state),
  sector: getCurrentSector(state),
  isDropdownActive: isDropdownActiveSelector(state),
  isInitialized: isInitializedSelector(state),
  topLevelEntities: getCurrentTopLevelEntities(state),
});

const mapDispatchToProps = dispatch => ({
  closeUserDropdown: () => dispatch(closeUserDropdown()),
  generateSector: () => dispatch(generateEntity(Entities.sector.key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectorMap);
