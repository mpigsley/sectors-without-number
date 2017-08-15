import { connect } from 'react-redux';

import { makeGetCurrentSystem } from 'store/selectors/sector.selectors';
import SystemInfo from './system-info';

const mapStateToProps = () => {
  const getCurrentSystem = makeGetCurrentSystem();
  return (state, props) => ({
    system: getCurrentSystem(state, props),
  });
};

export default connect(mapStateToProps)(SystemInfo);
