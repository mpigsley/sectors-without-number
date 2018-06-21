import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { currentLayer } from 'store/selectors/layer.selectors';

import LayerSidebar from './layer-sidebar';

const mapStateToProps = createStructuredSelector({
  layer: currentLayer,
});

export default connect(mapStateToProps)(LayerSidebar);
