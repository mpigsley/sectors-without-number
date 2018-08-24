import React from 'react';
import PropTypes from 'prop-types';

import SidebarContainer from 'primitives/container/sidebar-container';

export default function FactionForm({ isCreating, form, updateFaction }) {
  return <SidebarContainer title={isCreating ? 'New Faction' : form.name} />;
}

FactionForm.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  form: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  updateFaction: PropTypes.func.isRequired,
};
