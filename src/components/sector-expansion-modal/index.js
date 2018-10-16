import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import { closeSectorExpansion } from 'store/actions/sector.actions';
import { isSectorExpansionOpenSelector } from 'store/selectors/base.selectors';

import SectorExpansionModal from './sector-expansion-modal';

const mapStateToProps = createStructuredSelector({
  isOpen: isSectorExpansionOpenSelector,
});

export default injectIntl(
  connect(
    mapStateToProps,
    { closeSectorExpansion },
  )(SectorExpansionModal),
);
