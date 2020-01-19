import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import {
  getCustomTags,
  getIsCustomTagModalOpen,
} from 'store/selectors/base.selectors';
import {
  createTag,
  editTag,
  deleteTag,
  closeCustomTagModal,
} from 'store/actions/tag.actions';

import CustomTagModal from './custom-tag-modal';

const mapStateToProps = createStructuredSelector({
  isCustomTagModalOpen: getIsCustomTagModalOpen,
  tags: getCustomTags,
});

export default injectIntl(
  connect(
    mapStateToProps,
    { createTag, editTag, deleteTag, closeCustomTagModal },
  )(CustomTagModal),
);
