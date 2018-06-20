import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import { layerFormSelector } from 'store/selectors/base.selectors';
import { isValidLayerForm } from 'store/selectors/layer.selectors';
import { updateLayer, addLayer } from 'store/actions/layer.actions';

import NewLayer from './new-layer';

const mapStateToProps = createStructuredSelector({
  layerForm: layerFormSelector,
  isValid: isValidLayerForm,
});

const mapDispatchToProps = (dispatch, props) => ({
  updateLayer: (key, value) => dispatch(updateLayer(key, value)),
  addLayer: () => dispatch(addLayer(props.intl)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(NewLayer),
);
