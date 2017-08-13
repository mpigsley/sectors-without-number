import { connect } from 'react-redux';

import { deleteSector } from 'store/actions/sector.actions';
import Home from './home';

const mapStateToProps = state => ({
  saved: state.sector.saved,
});

const mapDispatchToProps = dispatch => ({
  deleteSector: key => {
    dispatch(deleteSector(key));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
