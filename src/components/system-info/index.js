import { connect } from 'react-redux';

import { makeGetCurrentSystem } from 'store/selectors/system.selectors';
import { editSystem } from 'store/actions/system.actions';
import SystemInfo from './system-info';

const mapStateToProps = () => {
  const getCurrentSystem = makeGetCurrentSystem();
  return (state, props) => ({
    system: getCurrentSystem(state, props),
  });
};

const mapDispatchToProps = dispatch => ({
  editSystemName: (system, value) => {
    dispatch(editSystem(system, 'name', value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SystemInfo);
