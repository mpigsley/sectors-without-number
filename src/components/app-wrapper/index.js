import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  userLocaleSelector,
  userModelLocaleSelector,
} from 'store/selectors/base.selectors';

import AppWrapper from './app-wrapper';

const mapStateToProps = state => ({
  userLocale: userModelLocaleSelector(state),
  locale: userLocaleSelector(state),
});

export default withRouter(connect(mapStateToProps)(AppWrapper));
