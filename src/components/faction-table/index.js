import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import {
  isLoggedInSelector,
  currentSectorSelector,
  currentEntitySelector,
} from 'store/selectors/base.selectors';
import {
  currentSectorFactionTable,
  currentFaction,
} from 'store/selectors/faction.selectors';
import {
  isCurrentSectorSaved,
  currentSectorIsLoading,
} from 'store/selectors/sector.selectors';

import FactionTable from './faction-table';

const mapStateToProps = createStructuredSelector({
  isLoggedIn: isLoggedInSelector,
  isSaved: isCurrentSectorSaved,
  table: currentSectorFactionTable,
  isLoading: currentSectorIsLoading,
  currentSector: currentSectorSelector,
  currentElement: currentEntitySelector,
  currentFaction,
});

export default injectIntl(withRouter(connect(mapStateToProps)(FactionTable)));
