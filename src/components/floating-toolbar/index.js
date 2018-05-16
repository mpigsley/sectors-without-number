import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import {
  currentSectorSelector,
  isSharedSectorSelector,
} from 'store/selectors/base.selectors';
import { getMapLock, getLayers } from 'store/selectors/entity.selectors';
import { toggleMapLock, toggleLayer } from 'store/actions/entity.actions';

import FloatingToolbar from './floating-toolbar';

const mapStateToProps = createStructuredSelector({
  sectorId: currentSectorSelector,
  mapLocked: getMapLock,
  layers: getLayers,
  isShared: isSharedSectorSelector,
});

const mapDispatchToProps = dispatch => ({
  toggleMapLock: () => dispatch(toggleMapLock()),
  toggleLayer: layer => dispatch(toggleLayer(layer)),
  redirectToHome: sectorId => dispatch(push(`/sector/${sectorId}`)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(FloatingToolbar),
);
