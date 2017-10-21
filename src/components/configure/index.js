import { connect } from 'react-redux';

import { updateConfiguration } from 'store/actions/sector.actions';
import Configure from './configure';

const mapStateToProps = state => ({
  ...state.sector.configuration,
});

const mapDispatchToProps = dispatch => ({
  updateConfiguration: (key, value) =>
    dispatch(updateConfiguration(key, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Configure);
