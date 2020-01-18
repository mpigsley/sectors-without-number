import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import {
  getCustomTags,
  getCustomTagForm,
  getIsCustomTagModalOpen,
} from 'store/selectors/base.selectors';
import { createTag, closeCustomTagModal } from 'store/actions/tag.actions';

import CustomTagModal from './custom-tag-modal';

const mapStateToProps = createStructuredSelector({
  isCustomTagModalOpen: getIsCustomTagModalOpen,
  form: getCustomTagForm,
  tags: getCustomTags,
});

export default injectIntl(
  connect(
    mapStateToProps,
    { createTag, closeCustomTagModal },
  )(CustomTagModal),
);
