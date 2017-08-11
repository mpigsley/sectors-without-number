import { connect } from 'react-redux';

import Home from './home';

const mapStateToProps = state => ({
  seed: state.sector.seed,
  saved: state.sector.saved,
});

export default connect(mapStateToProps)(Home);
