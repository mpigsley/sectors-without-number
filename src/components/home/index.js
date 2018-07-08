import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import Entities from 'constants/entities';
import { generateEntity } from 'store/actions/entity.actions';

import Home from './home';

const mapDispatchToProps = (dispatch, props) => ({
  generateSector: () =>
    dispatch(
      generateEntity({ entityType: Entities.sector.key }, {}, props.intl),
    ),
});

export default injectIntl(
  connect(
    undefined,
    mapDispatchToProps,
  )(Home),
);
