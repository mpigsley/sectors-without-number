import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import {
  layerIsEditingSelector,
  layerRegionEditSelector,
  layerColorPickerSelector,
} from 'store/selectors/base.selectors';
import { currentLayer } from 'store/selectors/layer.selectors';
import {
  initializeRegionEdit,
  submitColorChange,
} from 'store/actions/layer.actions';

import LayerSidebar from './layer-sidebar';

const mapStateToProps = createStructuredSelector({
  layer: currentLayer,
  isEditing: layerIsEditingSelector,
  regionEdit: layerRegionEditSelector,
  colorPicker: layerColorPickerSelector,
});

export default injectIntl(
  connect(mapStateToProps, { initializeRegionEdit, submitColorChange })(
    LayerSidebar,
  ),
);
