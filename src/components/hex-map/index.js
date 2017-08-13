import { connect } from 'react-redux';

import HexMap from './hex-map';

const mapStateToProps = ({ sector }) => ({
  holdKey: sector.holdKey,
});

export default connect(mapStateToProps)(HexMap);
