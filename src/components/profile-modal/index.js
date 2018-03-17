import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import {
  updateUserForm,
  updateUser,
  closeEditModal,
} from 'store/actions/user.actions';

import ProfileModal from './profile-modal';
import {
  userFormSelector,
  isUserEditModalOpenSelector,
} from '../../store/selectors/base.selectors';

const mapStateToProps = state => ({
  form: userFormSelector(state),
  isEditModalOpen: isUserEditModalOpenSelector(state),
});

export default injectIntl(
  connect(mapStateToProps, {
    updateUserForm,
    updateUser,
    closeEditModal,
  })(ProfileModal),
);
