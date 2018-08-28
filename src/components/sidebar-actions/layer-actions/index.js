import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import {
  isCurrentSectorSaved,
  isViewingSharedSector,
} from 'store/selectors/sector.selectors';
import {
  currentSectorSelector,
  currentEntitySelector,
  layerIsEditingSelector,
} from 'store/selectors/base.selectors';
import {
  currentLayer,
  isValidLayerForm,
} from 'store/selectors/layer.selectors';
import {
  initializeLayerEdit,
  submitForm,
  resetForms,
} from 'store/actions/layer.actions';
import { removeLayer } from 'store/actions/combined.actions';
import LayerActions from './layer-actions';

const mapStateToProps = createStructuredSelector({
  isSaved: isCurrentSectorSaved,
  isShared: isViewingSharedSector,
  isValid: isValidLayerForm,
  layer: currentLayer,
  layerId: currentEntitySelector,
  isEditing: layerIsEditingSelector,
  sector: currentSectorSelector,
});

const mapDispatchToProps = (dispatch, props) => ({
  removeLayer: () => dispatch(removeLayer(props.intl)),
  initializeLayerEdit: () => dispatch(initializeLayerEdit()),
  submitForm: () => dispatch(submitForm(props.intl)),
  cancelForm: () => dispatch(resetForms()),
  route: to => dispatch(push(to)),
});

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(LayerActions),
);
