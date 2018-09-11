import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { currentFactionAttributes } from 'store/selectors/faction.selectors';

import FactionAttributes from './faction-attributes';

const mapStateToProps = createStructuredSelector({
  attributes: currentFactionAttributes,
});

export default connect(mapStateToProps)(FactionAttributes);
