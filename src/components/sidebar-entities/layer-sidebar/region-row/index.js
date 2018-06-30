import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import {
  layerRegionEditSelector,
  layerColorPickerSelector,
  layerRegionPaintSelector,
} from 'store/selectors/base.selectors';
import {
  updateRegionForm,
  initializeRegionEdit,
  cancelRegionEdit,
  submitRegionEdit,
  openColorPicker,
  updateRegion,
  beginRegionPaint,
  closeRegionPaint,
} from 'store/actions/layer.actions';
import RegionRow from './region-row';

const mapStateToProps = createStructuredSelector({
  regionEdit: layerRegionEditSelector,
  colorPicker: layerColorPickerSelector,
  regionPaint: layerRegionPaintSelector,
});

const mapDispatchToProps = (dispatch, props) => ({
  updateRegionForm: update => dispatch(updateRegionForm(update)),
  cancelRegionEdit: () => dispatch(cancelRegionEdit()),
  submitRegionEdit: () => dispatch(submitRegionEdit(props.intl)),
  openColorPicker: regionId => dispatch(openColorPicker(regionId)),
  initializeRegionEdit: regionId => dispatch(initializeRegionEdit(regionId)),
  updateRegion: (regionId, update) => dispatch(updateRegion(regionId, update)),
  beginRegionPaint: regionId => dispatch(beginRegionPaint(regionId)),
  closeRegionPaint: () => dispatch(closeRegionPaint()),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(RegionRow),
);
