import { connect } from 'react-redux';

import HexMap from './hex-map';

const mapStateToProps = ({ system }) => ({
  holdKey: system.holdKey,
});

export default connect(mapStateToProps)(HexMap);
