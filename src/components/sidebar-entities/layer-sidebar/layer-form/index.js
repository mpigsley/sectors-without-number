import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import {
  currentSectorSelector,
  layerFormSelector,
  layerIsEditingSelector,
} from 'store/selectors/base.selectors';
import { isValidLayerForm } from 'store/selectors/layer.selectors';
import {
  updateLayer,
  submitForm,
  resetForms,
} from 'store/actions/layer.actions';

import LayerForm from './layer-form';

const mapStateToProps = createStructuredSelector({
  layerForm: layerFormSelector,
  isValid: isValidLayerForm,
  isEditing: layerIsEditingSelector,
  sector: currentSectorSelector,
});

const mapDispatchToProps = (dispatch, props) => ({
  updateLayer: (key, value) => dispatch(updateLayer(key, value)),
  submitForm: () => dispatch(submitForm(props.intl)),
  cancelForm: () => dispatch(resetForms()),
  route: to => dispatch(push(to)),
});

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(LayerForm),
);
