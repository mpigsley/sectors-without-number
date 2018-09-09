import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import {
  isLoggedInSelector,
  isInitializedSelector,
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
import { sectorDoesNotExist } from 'store/selectors/entity.selectors';

import FactionTable from './faction-table';

const mapStateToProps = createStructuredSelector({
  isInitialized: isInitializedSelector,
  isLoggedIn: isLoggedInSelector,
  isSaved: isCurrentSectorSaved,
  doesNotExist: sectorDoesNotExist,
  table: currentSectorFactionTable,
  isLoading: currentSectorIsLoading,
  currentSector: currentSectorSelector,
  currentElement: currentEntitySelector,
  currentFaction,
});

const mapDispatchToProps = dispatch => ({
  toSafeRoute: () => dispatch(push('/')),
});

export default injectIntl(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(FactionTable),
  ),
);
