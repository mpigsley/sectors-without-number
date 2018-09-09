import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { saveSector } from 'store/actions/entity.actions';

import FactionNotSaved from './faction-not-saved';

const mapDispatchToProps = (dispatch, props) => ({
  saveSector: () => dispatch(saveSector(props.intl)),
});

export default injectIntl(
  connect(
    undefined,
    mapDispatchToProps,
  )(FactionNotSaved),
);
