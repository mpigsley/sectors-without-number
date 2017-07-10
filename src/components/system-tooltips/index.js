import { connect } from 'react-redux';

import SystemTooltips from './system-tooltips';

const mapStateToProps = state => ({
  hoverKey: state.sector.hoverKey,
});

export default connect(mapStateToProps)(SystemTooltips);
