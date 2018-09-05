import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { push } from 'connected-react-router';

import {
  currentSectorSelector,
  currentEntitySelector,
} from 'store/selectors/base.selectors';
import {
  currentSectorFactionTable,
  currentFaction,
} from 'store/selectors/faction.selectors';
import { currentSectorIsLoading } from 'store/selectors/sector.selectors';

import FactionTable from './faction-table';

const mapStateToProps = createStructuredSelector({
  table: currentSectorFactionTable,
  isLoading: currentSectorIsLoading,
  currentSector: currentSectorSelector,
  currentElement: currentEntitySelector,
  currentFaction,
});

const mapDispatchToProps = (dispatch, { match }) => ({
  openSidebar: factionId =>
    dispatch(push(`/elements/${match.params.sector}/faction/${factionId}`)),
});

export default injectIntl(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(FactionTable),
  ),
);
