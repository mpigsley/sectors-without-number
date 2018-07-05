import React from 'react';
import PropTypes from 'prop-types';

import Entities from 'constants/entities';

import DefaultSidebar from 'components/sidebar-entities/default-sidebar';
import NoteSidebar from 'components/sidebar-entities/note-sidebar';
import NavigationSidebar from 'components/sidebar-entities/navigation-sidebar';
import LayerSidebar from 'components/sidebar-entities/layer-sidebar';

import DefaultActions from 'components/sidebar-actions/default-actions';
import EntityActions from 'components/sidebar-actions/entity-actions';
import LayerActions from 'components/sidebar-actions/layer-actions';

const SIDEBAR_TYPE = {
  default: DefaultSidebar,
  note: NoteSidebar,
  navigation: NavigationSidebar,
  layer: LayerSidebar,
};

const ACTION_TYPE = {
  default: DefaultActions,
  entity: EntityActions,
  layer: LayerActions,
};

export default function Sidebar({ entityType }) {
  const SidebarContent =
    SIDEBAR_TYPE[Entities[entityType].sidebar] || SIDEBAR_TYPE.default;
  const Actions =
    ACTION_TYPE[Entities[entityType].action] || ACTION_TYPE.default;
  return (
    <Actions>
      <SidebarContent />
    </Actions>
  );
}

Sidebar.propTypes = {
  entityType: PropTypes.string,
};

Sidebar.defaultProps = {
  entityType: undefined,
};
