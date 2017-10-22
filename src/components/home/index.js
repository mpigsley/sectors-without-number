import { connect } from 'react-redux';

import { generateSector } from 'store/actions/sector.actions';
import Home from './home';

const mapStateToProps = state => ({
  saved: state.sector.saved,
});

const mapDispatchToProps = dispatch => ({
  generateSector: () => dispatch(generateSector()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
