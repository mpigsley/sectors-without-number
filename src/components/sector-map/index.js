import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import Entities from 'constants/entities';
import { fetchSector } from 'store/actions/combined.actions';
import { generateEntity } from 'store/actions/entity.actions';
import { currentSectorIsLoading } from 'store/selectors/sector.selectors';
import {
  getCurrentTopLevelEntities,
  getCurrentSector,
} from 'store/selectors/entity.selectors';
import {
  renderSectorSelector,
  exportTypeSelector,
  isPrintingSelector,
} from 'store/selectors/base.selectors';

import SectorMap from './sector-map';

const mapStateToProps = createStructuredSelector({
  renderSector: renderSectorSelector,
  sector: getCurrentSector,
  isLoading: currentSectorIsLoading,
  topLevelEntities: getCurrentTopLevelEntities,
  exportType: exportTypeSelector,
  isPrinting: isPrintingSelector,
});

const mapDispatchToProps = (dispatch, props) => ({
  toSafeRoute: sector => dispatch(push(sector ? `/sector/${sector}` : '/')),
  fetchSector: () => dispatch(fetchSector()),
  generateSector: () =>
    dispatch(
      generateEntity({ entityType: Entities.sector.key }, {}, props.intl),
    ),
});

export default injectIntl(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(SectorMap),
  ),
);
