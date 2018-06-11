import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import {
  currentEntitySelector,
  layerFormSelector,
} from 'store/selectors/base.selectors';
import { updateLayer } from 'store/actions/layer.actions';

import LayerSidebar from './layer-sidebar';

const mapStateToProps = createStructuredSelector({
  entity: currentEntitySelector,
  layerForm: layerFormSelector,
});

export default injectIntl(
  connect(mapStateToProps, { updateLayer })(LayerSidebar),
);
