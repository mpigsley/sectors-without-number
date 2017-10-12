import { connect } from 'react-redux';

import { deleteSector } from 'store/actions/sector.actions';
import { openLoginModal } from 'store/actions/user.actions';
import Home from './home';

const mapStateToProps = state => ({
  saved: state.sector.saved,
});

const mapDispatchToProps = dispatch => ({
  deleteSector: key => {
    dispatch(deleteSector(key));
  },
  openLoginModal: () => {
    dispatch(openLoginModal());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
