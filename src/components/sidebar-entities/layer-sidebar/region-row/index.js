import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import { layerRegionEditSelector } from 'store/selectors/base.selectors';
import {
  updateRegion,
  cancelRegionEdit,
  submitRegionEdit,
} from 'store/actions/layer.actions';
import RegionRow from './region-row';

const mapStateToProps = createStructuredSelector({
  regionEdit: layerRegionEditSelector,
});

const mapDispatchToProps = (dispatch, props) => ({
  updateRegion: update => dispatch(updateRegion(update)),
  cancelRegionEdit: () => dispatch(cancelRegionEdit()),
  submitRegionEdit: () => dispatch(submitRegionEdit(props.intl)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(RegionRow),
);
