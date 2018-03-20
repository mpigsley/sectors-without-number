import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { initialize } from 'store/actions/user.actions';
import { routerLocationSelector } from 'store/selectors/base.selectors';

import InitWrapper from './init-wrapper';

const mapStateToProps = state => ({
  location: routerLocationSelector(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  initialize: location => dispatch(initialize(location, props.intl)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(InitWrapper),
);
