import { connect } from 'react-redux';

import { getPlanetKeys } from 'store/selectors/planet.selectors';
import { makeGetCurrentSystem } from 'store/selectors/system.selectors';
import { editSystem, deleteSystem } from 'store/actions/system.actions';
import { editPlanet } from 'store/actions/planet.actions';

import SystemInfo from './system-info';

const mapStateToProps = () => {
  const getCurrentSystem = makeGetCurrentSystem();
  return (state, props) => ({
    system: getCurrentSystem(state, props),
    planetKeys: getPlanetKeys(state, props),
  });
};

const mapDispatchToProps = dispatch => ({
  editSystem: system => dispatch(editSystem(system.key, system)),
  deleteSystem: system => dispatch(deleteSystem(system)),
  editPlanet: (system, planet) =>
    dispatch(editPlanet(system, planet.key, planet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SystemInfo);
