import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import {
  layerRegionEditSelector,
  layerColorPickerSelector,
} from 'store/selectors/base.selectors';
import {
  updateRegionForm,
  initializeRegionEdit,
  cancelRegionEdit,
  submitRegionEdit,
  openColorPicker,
  updateRegion,
} from 'store/actions/layer.actions';
import RegionRow from './region-row';

const mapStateToProps = createStructuredSelector({
  regionEdit: layerRegionEditSelector,
  colorPicker: layerColorPickerSelector,
});

const mapDispatchToProps = (dispatch, props) => ({
  updateRegionForm: update => dispatch(updateRegionForm(update)),
  cancelRegionEdit: () => dispatch(cancelRegionEdit()),
  submitRegionEdit: () => dispatch(submitRegionEdit(props.intl)),
  openColorPicker: regionId => dispatch(openColorPicker(regionId)),
  initializeRegionEdit: regionId => dispatch(initializeRegionEdit(regionId)),
  updateRegion: (regionId, update) => dispatch(updateRegion(regionId, update)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(RegionRow),
);
