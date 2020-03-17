import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import {
  currentEntitySelector,
  layerIsEditingSelector,
  layerRegionFormSelector,
  layerColorPickerSelector,
} from 'store/selectors/base.selectors';
import { visibleLayers } from 'store/selectors/layer.selectors';
import { isViewingSharedSector } from 'store/selectors/sector.selectors';
import {
  initializeRegionForm,
  updateRegion,
  removeRegion,
} from 'store/actions/layer.actions';

import LayerSidebar from './layer-sidebar';

const mapStateToProps = createStructuredSelector({
  layers: visibleLayers,
  layerId: currentEntitySelector,
  isEditing: layerIsEditingSelector,
  regionForm: layerRegionFormSelector,
  colorPicker: layerColorPickerSelector,
  isShared: isViewingSharedSector,
});

const mapDispatchToProps = (dispatch, props) => ({
  initializeRegionForm: regionId => dispatch(initializeRegionForm(regionId)),
  updateRegion: (regionId, update) => dispatch(updateRegion(regionId, update)),
  removeRegion: regionId => dispatch(removeRegion(regionId, props.intl)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(LayerSidebar),
);
