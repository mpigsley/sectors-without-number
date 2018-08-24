import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import {
  currentSectorSelector,
  currentEntitySelector,
} from 'store/selectors/base.selectors';
import { currentFaction } from 'store/selectors/faction.selectors';

import FactionTable from './faction-table';

const mapStateToProps = createStructuredSelector({
  currentSector: currentSectorSelector,
  currentElement: currentEntitySelector,
  currentFaction,
});

export default withRouter(connect(mapStateToProps)(FactionTable));
