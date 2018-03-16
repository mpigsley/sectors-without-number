import { connect } from 'react-redux';

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

export default connect(mapStateToProps, {
  updateUserForm,
  updateUser,
  closeEditModal,
})(ProfileModal);
