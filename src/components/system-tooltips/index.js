import { connect } from 'react-redux';

import SystemTooltips from './system-tooltips';

const mapStateToProps = ({ sector }) => ({
  hoverKey: sector.hoverKey,
});

export default connect(mapStateToProps)(SystemTooltips);
