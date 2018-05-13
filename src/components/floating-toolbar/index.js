import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import { currentSectorSelector } from 'store/selectors/base.selectors';
import { getMapLock, getLayers } from 'store/selectors/entity.selectors';
import { toggleMapLock, toggleLayer } from 'store/actions/entity.actions';

import FloatingToolbar from './floating-toolbar';

const mapStateToProps = createStructuredSelector({
  sectorId: currentSectorSelector,
  mapLocked: getMapLock,
  layers: getLayers,
});

export default injectIntl(
  connect(mapStateToProps, { toggleMapLock, toggleLayer })(FloatingToolbar),
);
