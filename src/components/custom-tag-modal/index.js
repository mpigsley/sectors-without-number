import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import {
  getCustomTagForm,
  getIsCustomTagModalOpen,
} from 'store/selectors/base.selectors';
import { closeCustomTagModal } from 'store/actions/tag.actions';

import CustomTagModal from './custom-tag-modal';

const mapStateToProps = createStructuredSelector({
  form: getCustomTagForm,
  isCustomTagModalOpen: getIsCustomTagModalOpen,
});

export default injectIntl(
  connect(
    mapStateToProps,
    { closeCustomTagModal },
  )(CustomTagModal),
);
