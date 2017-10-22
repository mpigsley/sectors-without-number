import { connect } from 'react-redux';

import {
  updateConfiguration,
  generateSector,
} from 'store/actions/sector.actions';
import Configure from './configure';

const mapStateToProps = state => ({
  ...state.sector.configuration,
});

const mapDispatchToProps = dispatch => ({
  updateConfiguration: (key, value) =>
    dispatch(updateConfiguration(key, value)),
  generateSector: () => dispatch(generateSector()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Configure);
