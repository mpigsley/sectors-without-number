import { connect } from 'react-redux';

import { getPlanetKeys } from 'store/selectors/planet.selectors';
import { makeGetCurrentSystem } from 'store/selectors/system.selectors';
import { editSystem } from 'store/actions/system.actions';
import SystemInfo from './system-info';

const mapStateToProps = () => {
  const getCurrentSystem = makeGetCurrentSystem();
  return (state, props) => ({
    system: getCurrentSystem(state, props),
    planetKeys: getPlanetKeys(state, props),
  });
};

const mapDispatchToProps = dispatch => ({
  editSystem: (system, changes) => {
    dispatch(editSystem(system, changes));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SystemInfo);
