import { connect } from 'react-redux';

import { holdKeySelector } from 'store/selectors/base.selectors';
import HexMap from './hex-map';

const mapStateToProps = state => ({
  holdKey: holdKeySelector(state),
});

export default connect(mapStateToProps)(HexMap);
