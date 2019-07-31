import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  holdKeySelector,
  hoverKeySelector,
} from 'store/selectors/base.selectors';
import { hexLayerNameMapping } from 'store/selectors/layer.selectors';
import EntityTooltips from './entity-tooltips';

const mapStateToProps = createStructuredSelector({
  holdKey: holdKeySelector,
  hoverKey: hoverKeySelector,
  hexLayerNames: hexLayerNameMapping,
});

export default connect(mapStateToProps)(EntityTooltips);
