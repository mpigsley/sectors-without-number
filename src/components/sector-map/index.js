import { connect } from 'react-redux';
import { push } from 'react-router-redux';

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
  exportTypeSelector,
} from 'store/selectors/base.selectors';
import { closeUserDropdown } from 'store/actions/user.actions';

import SectorMap from './sector-map';

const mapStateToProps = state => ({
  renderSector: renderSectorSelector(state),
  sector: getCurrentSector(state),
  isDropdownActive: isDropdownActiveSelector(state),
  isInitialized: isInitializedSelector(state),
  topLevelEntities: getCurrentTopLevelEntities(state),
  exportType: exportTypeSelector(state),
});

const mapDispatchToProps = dispatch => ({
  closeUserDropdown: () => dispatch(closeUserDropdown()),
  toSafeRoute: sector => dispatch(push(sector ? `/sector/${sector}` : '/')),
  generateSector: () =>
    dispatch(generateEntity({ entityType: Entities.sector.key })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectorMap);
