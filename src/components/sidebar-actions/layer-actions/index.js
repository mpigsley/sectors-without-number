import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import {
  isCurrentSectorSaved,
  isViewingSharedSector,
} from 'store/selectors/sector.selectors';
import { currentLayer } from 'store/selectors/layer.selectors';
import { initializeLayerEdit } from 'store/actions/layer.actions';
import { removeLayer } from 'store/actions/combined.actions';
import LayerActions from './layer-actions';

const mapStateToProps = state => ({
  isSaved: isCurrentSectorSaved(state),
  isShared: isViewingSharedSector(state),
  layer: currentLayer(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  removeLayer: () => dispatch(removeLayer(props.intl)),
  initializeLayerEdit: () => dispatch(initializeLayerEdit()),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(LayerActions),
);
