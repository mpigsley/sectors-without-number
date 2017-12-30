import { connect } from 'react-redux';

import {
  holdKeySelector,
  hoverKeySelector,
} from 'store/selectors/base.selectors';
import MovementVector, { MarkerDefs } from './movement-vector';

const mapStateToProps = state => ({
  holdKey: holdKeySelector(state),
  hoverKey: hoverKeySelector(state),
});

export { MarkerDefs };
export default connect(mapStateToProps)(MovementVector);
