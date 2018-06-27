import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { layerIsEditingSelector } from 'store/selectors/base.selectors';
import { currentLayer } from 'store/selectors/layer.selectors';

import LayerSidebar from './layer-sidebar';

const mapStateToProps = createStructuredSelector({
  layer: currentLayer,
  isEditing: layerIsEditingSelector,
});

export default connect(mapStateToProps)(LayerSidebar);
