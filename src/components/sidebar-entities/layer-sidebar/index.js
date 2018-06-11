import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { currentEntitySelector } from 'store/selectors/base.selectors';

import LayerSidebar from './layer-sidebar';

const mapStateToProps = createStructuredSelector({
  entity: currentEntitySelector,
});

export default connect(mapStateToProps)(LayerSidebar);