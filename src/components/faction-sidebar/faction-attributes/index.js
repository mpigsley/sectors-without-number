import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { currentFactionHomeworld } from 'store/selectors/faction.selectors';

import FactionAttributes from './faction-attributes';

const mapStateToProps = createStructuredSelector({
  homeworld: currentFactionHomeworld,
});

export default connect(mapStateToProps)(FactionAttributes);
