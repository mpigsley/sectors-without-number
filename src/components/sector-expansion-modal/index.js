import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import { closeSectorExpansion } from 'store/actions/sector.actions';
import { getCurrentSector } from 'store/selectors/entity.selectors';
import { isSectorExpansionOpenSelector } from 'store/selectors/base.selectors';

import SectorExpansionModal from './sector-expansion-modal';

const mapStateToProps = createStructuredSelector({
  isOpen: isSectorExpansionOpenSelector,
  sector: getCurrentSector,
});

export default injectIntl(
  connect(
    mapStateToProps,
    { closeSectorExpansion },
  )(SectorExpansionModal),
);
