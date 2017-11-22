import { connect } from 'react-redux';

import EntityTooltips from './entity-tooltips';

const mapStateToProps = ({ system }) => ({
  hoverKey: system.hoverKey,
  holdKey: system.holdKey,
});

export default connect(mapStateToProps)(EntityTooltips);
