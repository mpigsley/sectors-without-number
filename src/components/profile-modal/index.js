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

const mapDispatchToProps = (dispatch, props) => ({
  updateUserForm: (key, value) => dispatch(updateUserForm(key, value)),
  updateUser: () => dispatch(updateUser(props.intl)),
  closeEditModal: () => dispatch(closeEditModal()),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(ProfileModal),
);
