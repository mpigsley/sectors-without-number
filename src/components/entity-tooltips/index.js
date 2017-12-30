import { connect } from 'react-redux';

import {
  holdKeySelector,
  hoverKeySelector,
} from 'store/selectors/base.selectors';
import EntityTooltips from './entity-tooltips';

const mapStateToProps = state => ({
  holdKey: holdKeySelector(state),
  hoverKey: hoverKeySelector(state),
});

export default connect(mapStateToProps)(EntityTooltips);
