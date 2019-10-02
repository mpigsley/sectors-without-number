import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { currentEntitySelector } from 'store/selectors/base.selectors';
import { currentFactionAttributes } from 'store/selectors/faction.selectors';

import FactionAttributes from './faction-attributes';

const mapStateToProps = createStructuredSelector({
  currentFaction: currentEntitySelector,
  attributes: currentFactionAttributes,
});

export default connect(mapStateToProps)(FactionAttributes);
