import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import { openLoginModal } from 'store/actions/user.actions';
import { isLoggedInSelector } from 'store/selectors/base.selectors';
import { saveSector } from 'store/actions/entity.actions';

import FactionNotSaved from './faction-not-saved';

const mapStateToProps = createStructuredSelector({
  isLoggedIn: isLoggedInSelector,
});

const mapDispatchToProps = (dispatch, props) => ({
  saveSector: () => dispatch(saveSector(props.intl)),
  openLoginModal: () => dispatch(openLoginModal()),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(FactionNotSaved),
);
