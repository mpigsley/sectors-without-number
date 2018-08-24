import React from 'react';
import PropTypes from 'prop-types';

import SidebarContainer from 'primitives/container/sidebar-container';
import SaveFooter from 'primitives/other/save-footer';

import { dropRight } from 'constants/lodash';

export default function FactionForm({
  isCreating,
  form,
  updateFaction,
  toRoute,
  location,
}) {
  return (
    <SidebarContainer
      title={isCreating ? 'New Faction' : form.name}
      footer={
        <SaveFooter
          onCancel={() =>
            toRoute(dropRight(location.pathname.split('/')).join('/'))
          }
          onSave={() => {}}
        />
      }
    />
  );
}

FactionForm.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  form: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  updateFaction: PropTypes.func.isRequired,
  toRoute: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
