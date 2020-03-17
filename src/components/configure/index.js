import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import Entities from 'constants/entities';
import {
  isLoggedInSelector,
  configurationSelector,
} from 'store/selectors/base.selectors';
import { generateEntity } from 'store/actions/entity.actions';
import { updateConfiguration } from 'store/actions/sector.actions';
import { openCustomTagModal } from 'store/actions/tag.actions';
import Configure from './configure';

const mapStateToProps = state => ({
  isLoggedIn: isLoggedInSelector(state),
  ...configurationSelector(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  openCustomTagModal: () => dispatch(openCustomTagModal()),
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
