import { connect } from 'react-redux';

import Entities from 'constants/entities';
import { generateEntity } from 'store/actions/entity.actions';
import { getCurrentSector } from 'store/selectors/entity.selectors';
import {
  renderSectorSelector,
  isInitializedSelector,
} from 'store/selectors/base.selectors';

import Sector from './sector';

const mapStateToProps = state => ({
  renderSector: renderSectorSelector(state),
  sector: getCurrentSector(state),
  isInitialized: isInitializedSelector(state),
});

const mapDispatchToProps = dispatch => ({
  generateSector: () =>
    dispatch(generateEntity({ entityType: Entities.sector.key })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sector);
