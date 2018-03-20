import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { injectIntl } from 'react-intl';

import Entities from 'constants/entities';
import { generateEntity } from 'store/actions/entity.actions';
import {
  getCurrentTopLevelEntities,
  getCurrentSector,
} from 'store/selectors/entity.selectors';
import {
  renderSectorSelector,
  isInitializedSelector,
  exportTypeSelector,
} from 'store/selectors/base.selectors';

import SectorMap from './sector-map';

const mapStateToProps = state => ({
  renderSector: renderSectorSelector(state),
  sector: getCurrentSector(state),
  isInitialized: isInitializedSelector(state),
  topLevelEntities: getCurrentTopLevelEntities(state),
  exportType: exportTypeSelector(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  toSafeRoute: sector => dispatch(push(sector ? `/sector/${sector}` : '/')),
  generateSector: () =>
    dispatch(generateEntity({ entityType: Entities.sector.key }, props.intl)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(SectorMap),
);
