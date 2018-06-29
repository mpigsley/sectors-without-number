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
  updateRegion,
  removeRegion,
} from 'store/actions/layer.actions';

import LayerSidebar from './layer-sidebar';

const mapStateToProps = createStructuredSelector({
  layer: currentLayer,
  isEditing: layerIsEditingSelector,
  regionEdit: layerRegionEditSelector,
  colorPicker: layerColorPickerSelector,
});

const mapDispatchToProps = (dispatch, props) => ({
  initializeRegionEdit: regionId => dispatch(initializeRegionEdit(regionId)),
  updateRegion: (regionId, update) => dispatch(updateRegion(regionId, update)),
  removeRegion: regionId => dispatch(removeRegion(regionId, props.intl)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(LayerSidebar),
);
