import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { injectIntl } from 'react-intl';

import Entities from 'constants/entities';
import { enterGameRoute } from 'store/actions/combined.actions';
import { generateEntity } from 'store/actions/entity.actions';
import { isFetchingCurrentNavigation } from 'store/selectors/navigation.selectors';
import {
  getCurrentTopLevelEntities,
  getCurrentSector,
  isFetchingCurrentSector,
} from 'store/selectors/entity.selectors';
import {
  renderSectorSelector,
  isInitializedSelector,
  exportTypeSelector,
  isPrintingSelector,
} from 'store/selectors/base.selectors';

import SectorMap from './sector-map';

const mapStateToProps = state => ({
  renderSector: renderSectorSelector(state),
  sector: getCurrentSector(state),
  hasLoaded:
    isInitializedSelector(state) &&
    !isFetchingCurrentSector(state) &&
    !isFetchingCurrentNavigation(state),
  topLevelEntities: getCurrentTopLevelEntities(state),
  exportType: exportTypeSelector(state),
  isPrinting: isPrintingSelector(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  toSafeRoute: sector => dispatch(push(sector ? `/sector/${sector}` : '/')),
  enterGameRoute: () => dispatch(enterGameRoute()),
  generateSector: () =>
    dispatch(
      generateEntity({ entityType: Entities.sector.key }, {}, props.intl),
    ),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(SectorMap),
);
