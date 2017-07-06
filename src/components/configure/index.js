import { connect } from 'react-redux';

import { updateSector } from '../../store/actions/sector.actions';
import Configure from './configure';

const mapStateToProps = state => ({
  seed: state.sector.seed,
  columns: state.sector.columns,
  rows: state.sector.rows,
});

const mapDispatchToProps = dispatch => ({
  updateSector: (key, value) => {
    dispatch(updateSector(key, value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Configure);
