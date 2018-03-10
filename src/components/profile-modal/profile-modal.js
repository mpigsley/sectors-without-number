import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Button from 'primitives/other/button';
import Modal from 'primitives/modal/modal';
import Label from 'primitives/form/label';
import Input from 'primitives/form/input';

export default function ProfileModal({
  closeEditModal,
  updateUserForm,
  updateUser,
  isEditModalOpen,
  displayName,
}) {
  return (
    <Fragment>
      <Modal
        isOpen={isEditModalOpen}
        onCancel={closeEditModal}
        title="Edit Profile"
        actionButtons={[
          <Button primary key="save" onClick={updateUser}>
            Save User
          </Button>,
        ]}
      >
        <Label noPadding htmlFor="username">
          Username
        </Label>
        <Input
          id="username"
          name="username"
          data-key="username"
          value={displayName}
          onChange={({ target }) => updateUserForm('displayName', target.value)}
        />
      </Modal>
    </Fragment>
  );
}

ProfileModal.propTypes = {
  closeEditModal: PropTypes.func.isRequired,
  updateUserForm: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  isEditModalOpen: PropTypes.bool.isRequired,
  displayName: PropTypes.string,
};

ProfileModal.defaultProps = {
  displayName: '',
};
