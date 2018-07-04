import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import {
  layerIsEditingSelector,
  layerRegionFormSelector,
  layerColorPickerSelector,
} from 'store/selectors/base.selectors';
import { visibleLayer } from 'store/selectors/layer.selectors';
import {
  initializeRegionForm,
  updateRegion,
  removeRegion,
} from 'store/actions/layer.actions';

import LayerSidebar from './layer-sidebar';

const mapStateToProps = createStructuredSelector({
  layer: visibleLayer,
  isEditing: layerIsEditingSelector,
  regionForm: layerRegionFormSelector,
  colorPicker: layerColorPickerSelector,
});

const mapDispatchToProps = (dispatch, props) => ({
  initializeRegionForm: regionId => dispatch(initializeRegionForm(regionId)),
  updateRegion: (regionId, update) => dispatch(updateRegion(regionId, update)),
  removeRegion: regionId => dispatch(removeRegion(regionId, props.intl)),
});

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(LayerSidebar),
);
