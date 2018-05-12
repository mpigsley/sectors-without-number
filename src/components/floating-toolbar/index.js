import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import { getMapLock } from 'store/selectors/entity.selectors';
import { toggleMapLock } from 'store/actions/entity.actions';

import FloatingToolbar from './floating-toolbar';

const mapStateToProps = createStructuredSelector({
  mapLocked: getMapLock,
});

export default injectIntl(
  connect(mapStateToProps, { toggleMapLock })(FloatingToolbar),
);
