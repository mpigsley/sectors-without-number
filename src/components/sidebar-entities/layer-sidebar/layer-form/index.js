import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import { layerFormSelector } from 'store/selectors/base.selectors';
import { updateLayer } from 'store/actions/layer.actions';

import LayerForm from './layer-form';

const mapStateToProps = createStructuredSelector({
  layerForm: layerFormSelector,
});

export default injectIntl(connect(mapStateToProps, { updateLayer })(LayerForm));
