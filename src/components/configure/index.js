import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import Entities from 'constants/entities';
import { generateEntity } from 'store/actions/entity.actions';
import { updateConfiguration } from 'store/actions/sector.actions';
import Configure from './configure';

const mapStateToProps = state => ({
  ...state.sector.configuration,
});

const mapDispatchToProps = (dispatch, props) => ({
  updateConfiguration: (key, value) =>
    dispatch(updateConfiguration(key, value)),
  generateSector: () =>
    dispatch(
      generateEntity({ entityType: Entities.sector.key }, {}, props.intl),
    ),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(Configure),
);
