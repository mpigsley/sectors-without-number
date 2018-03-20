import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import Entities from 'constants/entities';
import { generateEntity } from 'store/actions/entity.actions';
import { getUserSectors } from 'store/selectors/sector.selectors';
import Home from './home';

const mapStateToProps = state => ({
  saved: getUserSectors(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  generateSector: () =>
    dispatch(generateEntity({ entityType: Entities.sector.key }, props.intl)),
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Home));
