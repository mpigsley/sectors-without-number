import { connect } from 'react-redux';

import SystemInfo from './system-info';

const mapStateToProps = ({ sector }, { routeParams }) => ({
  system: sector.generated.systems
    ? sector.generated.systems[routeParams.system] || {}
    : {},
});

export default connect(mapStateToProps)(SystemInfo);
