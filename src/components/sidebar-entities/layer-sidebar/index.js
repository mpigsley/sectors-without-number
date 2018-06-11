import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import { currentEntitySelector } from 'store/selectors/base.selectors';

import LayerSidebar from './layer-sidebar';

const mapStateToProps = createStructuredSelector({
  entity: currentEntitySelector,
});

export default injectIntl(connect(mapStateToProps)(LayerSidebar));
