import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import {
  customTagSelector,
  isCustomTagModalOpenSelector,
} from 'store/selectors/base.selectors';
import {
  createTag,
  editTag,
  deleteTag,
  closeCustomTagModal,
} from 'store/actions/tag.actions';

import CustomTagModal from './custom-tag-modal';

const mapStateToProps = createStructuredSelector({
  isCustomTagModalOpen: isCustomTagModalOpenSelector,
  tags: customTagSelector,
});

export default injectIntl(
  connect(
    mapStateToProps,
    { createTag, editTag, deleteTag, closeCustomTagModal },
  )(CustomTagModal),
);
