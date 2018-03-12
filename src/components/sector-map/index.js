import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import {
  getCurrentTopLevelEntities,
  getCurrentSector,
} from 'store/selectors/entity.selectors';
import {
  renderSectorSelector,
  exportTypeSelector,
} from 'store/selectors/base.selectors';

import SectorMap from './sector-map';

const mapStateToProps = state => ({
  renderSector: renderSectorSelector(state),
  sector: getCurrentSector(state),
  topLevelEntities: getCurrentTopLevelEntities(state),
  exportType: exportTypeSelector(state),
});

const mapDispatchToProps = dispatch => ({
  toSafeRoute: sector => dispatch(push(sector ? `/sector/${sector}` : '/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectorMap);
