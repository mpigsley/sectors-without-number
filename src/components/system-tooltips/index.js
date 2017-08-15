import { connect } from 'react-redux';

import SystemTooltips from './system-tooltips';

const mapStateToProps = ({ sector }) => ({
  hoverKey: sector.hoverKey,
  holdKey: sector.holdKey,
});

export default connect(mapStateToProps)(SystemTooltips);
