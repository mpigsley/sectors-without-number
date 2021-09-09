import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import {
  currentSectorSelector,
  currentEntitySelector,
  layerIsEditingSelector,
  layerRegionFormSelector,
  layerColorPickerSelector,
} from 'store/selectors/base.selectors';
import { currentLayer } from 'store/selectors/layer.selectors';
import { isViewingSharedSector } from 'store/selectors/sector.selectors';
import {
  initializeRegionForm,
  updateRegion,
  removeRegion,
} from 'store/actions/layer.actions';

import LayerSidebar from './layer-sidebar';

const mapStateToProps = createStructuredSelector({
  colorPicker: layerColorPickerSelector,
  regionForm: layerRegionFormSelector,
  isEditing: layerIsEditingSelector,
  isShared: isViewingSharedSector,
  sectorId: currentSectorSelector,
  layerId: currentEntitySelector,
  currentLayer,
});

const mapDispatchToProps = (dispatch, props) => ({
  initializeRegionForm: (regionId) => dispatch(initializeRegionForm(regionId)),
  updateRegion: (regionId, update) => dispatch(updateRegion(regionId, update)),
  removeRegion: (regionId) => dispatch(removeRegion(regionId, props.intl)),
  toSafeRoute: (sectorId) => dispatch(push(`/sector/${sectorId}`)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(LayerSidebar),
);
