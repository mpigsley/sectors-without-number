import { connect } from 'react-redux';

import MovementVector, { MarkerDefs } from './movement-vector';

const mapStateToProps = ({ system }) => ({
  holdKey: system.holdKey,
  hoverKey: system.hoverKey,
});

export { MarkerDefs };
export default connect(mapStateToProps)(MovementVector);
