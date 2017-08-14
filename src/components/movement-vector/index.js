import { connect } from 'react-redux';

import MovementVector, { MarkerDefs } from './movement-vector';

const mapStateToProps = ({ sector }) => ({
  holdKey: sector.holdKey,
  hoverKey: sector.hoverKey,
});

export { MarkerDefs };
export default connect(mapStateToProps)(MovementVector);
