import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import {
  playerViewSelector,
  currentSectorSelector,
  isSharedSectorSelector,
} from 'store/selectors/base.selectors';
import {
  isCurrentSectorSaved,
  isViewingSharedSector,
} from 'store/selectors/sector.selectors';
import { currentSectorLayers } from 'store/selectors/layer.selectors';
import { getMapLock, getSectorLayers } from 'store/selectors/entity.selectors';
import { toggleMapLock, toggleLayer } from 'store/actions/entity.actions';
import { togglePlayerView } from 'store/actions/sector.actions';

import FloatingToolbar from './floating-toolbar';

const mapStateToProps = createStructuredSelector({
  sectorId: currentSectorSelector,
  mapLocked: getMapLock,
  layers: currentSectorLayers,
  sectorLayers: getSectorLayers,
  isSharedSector: isSharedSectorSelector,
  isShared: isViewingSharedSector,
  isSaved: isCurrentSectorSaved,
  playerView: playerViewSelector,
});

const mapDispatchToProps = dispatch => ({
  toggleMapLock: () => dispatch(toggleMapLock()),
  togglePlayerView: () => dispatch(togglePlayerView()),
  toggleLayer: layer => dispatch(toggleLayer(layer)),
  redirectToHome: sectorId => dispatch(push(`/sector/${sectorId}`)),
});

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withRouter(FloatingToolbar)),
);
