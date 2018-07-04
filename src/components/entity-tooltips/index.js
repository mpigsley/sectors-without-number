import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  holdKeySelector,
  hoverKeySelector,
} from 'store/selectors/base.selectors';
import { visibleLayer } from 'store/selectors/layer.selectors';
import EntityTooltips from './entity-tooltips';

const mapStateToProps = createStructuredSelector({
  holdKey: holdKeySelector,
  hoverKey: hoverKeySelector,
  layer: visibleLayer,
});

export default connect(mapStateToProps)(EntityTooltips);
