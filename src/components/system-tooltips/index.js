import { connect } from 'react-redux';

import SystemTooltips from './system-tooltips';

const mapStateToProps = ({ system }) => ({
  hoverKey: system.hoverKey,
  holdKey: system.holdKey,
});

export default connect(mapStateToProps)(SystemTooltips);
