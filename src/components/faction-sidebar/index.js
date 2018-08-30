import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { currentFaction } from 'store/selectors/faction.selectors';

import FactionSidebar from './faction-sidebar';

const mapStateToProps = createStructuredSelector({
  faction: currentFaction,
});

export default connect(mapStateToProps)(FactionSidebar);
