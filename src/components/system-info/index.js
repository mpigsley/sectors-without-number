import { connect } from 'react-redux';

import SystemInfo from './system-info';

const mapStateToProps = ({ sector }, { routeParams }) => ({
  system: sector.systems ? sector.systems[routeParams.system] || {} : {},
});

export default connect(mapStateToProps)(SystemInfo);
