import { connect } from 'react-redux';

import {
  updateUserForm,
  updateUser,
  closeEditModal,
} from 'store/actions/user.actions';

import ProfileModal from './profile-modal';
import {
  displayNameSelector,
  isUserEditModalOpen,
} from '../../store/selectors/base.selectors';

const mapStateToProps = state => ({
  displayName: displayNameSelector(state),
  isEditModalOpen: isUserEditModalOpen(state),
});

export default connect(mapStateToProps, {
  updateUserForm,
  updateUser,
  closeEditModal,
})(ProfileModal);
