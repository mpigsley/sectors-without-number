import { connect } from 'react-redux';

import Entities from 'constants/entities';
import { generateEntity } from 'store/actions/entity.actions';
import { updateConfiguration } from 'store/actions/sector.actions';
import Configure from './configure';

const mapStateToProps = state => ({
  ...state.sector.configuration,
});

const mapDispatchToProps = dispatch => ({
  updateConfiguration: (key, value) =>
    dispatch(updateConfiguration(key, value)),
  generateSector: () =>
    dispatch(generateEntity({ entityType: Entities.sector.key })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Configure);
