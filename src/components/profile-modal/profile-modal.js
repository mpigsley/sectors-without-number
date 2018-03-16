import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

import Button from 'primitives/other/button';
import Modal from 'primitives/modal/modal';
import Label from 'primitives/form/label';
import Input from 'primitives/form/input';
import Dropdown from 'primitives/form/dropdown';
import LOCALES from 'constants/locale';

export default function ProfileModal({
  closeEditModal,
  updateUserForm,
  updateUser,
  isEditModalOpen,
  form,
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
          value={form.displayName || ''}
          onChange={({ target }) => updateUserForm('displayName', target.value)}
        />
        <Label htmlFor="language">Language</Label>
        <Dropdown
          id="language"
          name="language"
          clearable={false}
          value={form.locale}
          options={map(LOCALES, ({ value, name }) => ({ value, label: name }))}
          onChange={({ value }) => updateUserForm('locale', value)}
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
  form: PropTypes.shape({
    displayName: PropTypes.string,
    locale: PropTypes.string,
  }).isRequired,
};

ProfileModal.defaultProps = {};
