import { connect } from 'react-redux';

import Home from './home';

const mapStateToProps = state => ({
  seed: state.sector.seed,
});

export default connect(mapStateToProps)(Home);
