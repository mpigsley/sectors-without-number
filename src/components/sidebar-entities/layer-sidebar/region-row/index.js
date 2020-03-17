import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import {
  layerRegionFormSelector,
  layerColorPickerSelector,
  layerRegionPaintSelector,
} from 'store/selectors/base.selectors';
import { isViewingSharedSector } from 'store/selectors/sector.selectors';
import {
  updateRegionForm,
  initializeRegionForm,
  cancelRegionForm,
  submitRegionForm,
  openColorPicker,
  updateRegion,
  beginRegionPaint,
  closeRegionPaint,
} from 'store/actions/layer.actions';
import RegionRow from './region-row';

const mapStateToProps = createStructuredSelector({
  regionForm: layerRegionFormSelector,
  colorPicker: layerColorPickerSelector,
  regionPaint: layerRegionPaintSelector,
  isShared: isViewingSharedSector,
});

const mapDispatchToProps = (dispatch, props) => ({
  updateRegionForm: update => dispatch(updateRegionForm(update)),
  cancelRegionForm: () => dispatch(cancelRegionForm()),
  submitRegionForm: () => dispatch(submitRegionForm(props.intl)),
  openColorPicker: regionId => dispatch(openColorPicker(regionId)),
  initializeRegionForm: regionId => dispatch(initializeRegionForm(regionId)),
  updateRegion: (regionId, update) => dispatch(updateRegion(regionId, update)),
  beginRegionPaint: regionId => dispatch(beginRegionPaint(regionId)),
  closeRegionPaint: () => dispatch(closeRegionPaint()),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(RegionRow),
);
