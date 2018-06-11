import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import {
  currentEntitySelector,
  layerFormSelector,
} from 'store/selectors/base.selectors';
import { updateLayer, addLayer } from 'store/actions/layer.actions';

import LayerSidebar from './layer-sidebar';

const mapStateToProps = createStructuredSelector({
  entity: currentEntitySelector,
  layerForm: layerFormSelector,
});

const mapDispatchToProps = (dispatch, props) => ({
  updateLayer: (key, value) => dispatch(updateLayer(key, value)),
  addLayer: () => dispatch(addLayer(props.intl)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(LayerSidebar),
);
