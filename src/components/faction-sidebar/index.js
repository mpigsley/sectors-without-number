import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import {
  currentSectorSelector,
  currentEntitySelector,
} from 'store/selectors/base.selectors';
import { currentFaction } from 'store/selectors/faction.selectors';

import FactionSidebar from './faction-sidebar';

const mapStateToProps = createStructuredSelector({
  faction: currentFaction,
  currentSector: currentSectorSelector,
  currentFaction: currentEntitySelector,
});

export default injectIntl(connect(mapStateToProps)(FactionSidebar));
