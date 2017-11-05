import { connect } from 'react-redux';

import { generateSector } from 'store/actions/sector.actions';
import { getUserSectors } from 'store/selectors/sector.selectors';
import Home from './home';

const mapStateToProps = state => ({
  saved: getUserSectors(state),
});

const mapDispatchToProps = dispatch => ({
  generateSector: () => dispatch(generateSector()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
