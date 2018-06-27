import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import {
  layerFormSelector,
  layerIsEditingSelector,
} from 'store/selectors/base.selectors';
import { isValidLayerForm } from 'store/selectors/layer.selectors';
import { updateLayer, submitForm } from 'store/actions/layer.actions';

import LayerForm from './layer-form';

const mapStateToProps = createStructuredSelector({
  layerForm: layerFormSelector,
  isValid: isValidLayerForm,
  isEditing: layerIsEditingSelector,
});

const mapDispatchToProps = (dispatch, props) => ({
  updateLayer: (key, value) => dispatch(updateLayer(key, value)),
  submitForm: () => dispatch(submitForm(props.intl)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(LayerForm),
);
