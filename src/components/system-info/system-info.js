import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

import SidebarInfo from 'components/sidebar-info';
import SidebarNavigation, { SidebarType } from 'components/sidebar-navigation';
import SidebarLinkRow from 'components/sidebar-link-row';
import SystemEditModal from 'components/system-edit-modal';

import Header, { HeaderType } from 'primitives/text/header';
import SectionHeader from 'primitives/text/section-header';

import { toCommaArray } from 'utils/common';
import WorldTags from 'constants/world-tags';

import './style.css';

const renderPlanetLinks = (planets, { pathname }) =>
  map(planets, (planet, key) => (
    <SidebarLinkRow key={planet.name} to={`${pathname}/planet/${key}`}>
      <Header type={HeaderType.header4} className="SystemInfo-Name">
        {planet.name}
      </Header>
      {!planet.tags.length ? null : (
        <div className="SystemInfo-Tags">
          ({planet.tags
            .map(tag => WorldTags[tag].name)
            .map(toCommaArray)
            .join('')})
        </div>
      )}
    </SidebarLinkRow>
  ));

export default class SectorInfo extends SidebarInfo {
  static propTypes = {
    system: PropTypes.shape({
      key: PropTypes.string,
      name: PropTypes.string,
      planets: PropTypes.shape({
        key: PropTypes.string,
        name: PropTypes.string,
      }),
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
    router: PropTypes.shape({
      params: PropTypes.shape({
        sector: PropTypes.string.isRequired,
      }),
    }).isRequired,
    editSystem: PropTypes.func.isRequired,
    deleteSystem: PropTypes.func.isRequired,
    planetKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  state = {
    isOpen: false,
    isConfirmDeleteOpen: false,
  };

  onSaveSystem = system => {
    this.props.editSystem(system);
    this.onClose();
  };

  onDeleteSystem = system => () => {
    this.onCancelDelete();
    this.props.deleteSystem(system);
  };

  render() {
    return (
      <SidebarNavigation
        name={this.props.system.name}
        back={`/sector/${this.props.router.params.sector}`}
        type={SidebarType.system}
        onEdit={this.onEdit}
        onDelete={this.onConfirmDelete}
      >
        <SectionHeader>Planets</SectionHeader>
        {renderPlanetLinks(this.props.system.planets, this.props.location)}
        {this.renderConfirmModal(
          this.onDeleteSystem(this.props.system.key),
          'system',
        )}
        <SystemEditModal
          systemKey={this.props.system.key}
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          onSubmit={this.onSaveSystem}
        />
      </SidebarNavigation>
    );
  }
}
