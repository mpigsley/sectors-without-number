import { connect } from 'react-redux';

import { holdKeySelector } from 'store/selectors/base.selectors';
import { getActiveEntityKey } from 'store/selectors/entity.selectors';
import HexMap from './hex-map';

const mapStateToProps = state => ({
  holdKey: holdKeySelector(state),
  activeKey: getActiveEntityKey(state),
});

export default connect(mapStateToProps)(HexMap);
