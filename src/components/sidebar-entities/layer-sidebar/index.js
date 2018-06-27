import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import { layerIsEditingSelector } from 'store/selectors/base.selectors';
import { currentLayer } from 'store/selectors/layer.selectors';
import { initializeRegionEdit } from 'store/actions/layer.actions';

import LayerSidebar from './layer-sidebar';

const mapStateToProps = createStructuredSelector({
  layer: currentLayer,
  isEditing: layerIsEditingSelector,
});

export default injectIntl(
  connect(mapStateToProps, { initializeRegionEdit })(LayerSidebar),
);
