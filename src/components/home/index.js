import { connect } from 'react-redux';

import Entities from 'constants/entities';
import { generateEntity } from 'store/actions/entity.actions';
import { getUserSectors } from 'store/selectors/sector.selectors';
import Home from './home';

const mapStateToProps = state => ({
  saved: getUserSectors(state),
});

const mapDispatchToProps = dispatch => ({
  generateSector: () => dispatch(generateEntity(Entities.sector.key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
