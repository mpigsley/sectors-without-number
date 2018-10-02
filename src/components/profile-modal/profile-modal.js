import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';

import LabeledInput from 'primitives/form/labeled-input';
import Button from 'primitives/other/button';
import Modal from 'primitives/modal/modal';
import LOCALES from 'constants/locale';
import { map } from 'constants/lodash';

import './style.scss';

export default function ProfileModal({
  closeEditModal,
  updateUserForm,
  updateUser,
  isEditModalOpen,
  form,
  intl,
}) {
  return (
    <>
      >
      <Modal
        isOpen={isEditModalOpen}
        onCancel={closeEditModal}
        title={intl.formatMessage({ id: 'misc.editProfile' })}
        actionButtons={[
          <Button primary key="save" onClick={updateUser}>
            <FormattedMessage id="misc.saveUser" />
          </Button>,
        ]}
      >
        <div className="ProfileModel-Content">
          <LabeledInput
            isVertical
            label="misc.username"
            value={form.displayName || ''}
            onChange={({ target }) =>
              updateUserForm('displayName', target.value)
            }
          />
          <LabeledInput
            isVertical
            label="misc.language"
            dropUp
            type="dropdown"
            clearable={false}
            value={form.locale}
            options={map(LOCALES, ({ value, name }) => ({
              value,
              label: name,
            }))}
            onChange={({ value }) => updateUserForm('locale', value)}
          />
        </div>
      </Modal>
    </>
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
  intl: intlShape.isRequired,
};

ProfileModal.defaultProps = {};
