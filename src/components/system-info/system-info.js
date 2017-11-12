import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { Plus } from 'react-feather';

import SidebarInfo from 'components/sidebar-info';
import SidebarNavigation, { SidebarType } from 'components/sidebar-navigation';
import SidebarLinkRow from 'components/sidebar-link-row';
import SystemEditModal from 'components/system-edit-modal';
import PlanetEditModal from 'components/planet-edit-modal';

import Header, { HeaderType } from 'primitives/text/header';
import SectionHeader from 'primitives/text/section-header';
import FlexContainer from 'primitives/container/flex-container';
import Button from 'primitives/other/button';
import LinkIcon from 'primitives/other/link-icon';

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
    editPlanet: PropTypes.func.isRequired,
    planetKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    isCloudSave: PropTypes.bool.isRequired,
  };

  state = {
    isOpen: false,
    isConfirmDeleteOpen: false,
    isAddPlanetOpen: false,
  };

  onSaveSystem = system => {
    this.props.editSystem(system);
    this.onClose();
  };

  onDeleteSystem = system => () => {
    this.onCancelDelete();
    this.props.deleteSystem(system);
  };

  onCreatePlanet = planet => {
    this.props.editPlanet(this.props.system.key, planet);
    this.setState({ isAddPlanetOpen: false });
  };

  renderPlanetsHeader = () => {
    if (this.props.isCloudSave) {
      return <SectionHeader>Planets</SectionHeader>;
    }
    return (
      <SectionHeader>
        <FlexContainer justify="spaceBetween" align="flexEnd">
          Planets
          <Button
            minimal
            className="SectorInfo-AddButton"
            onClick={() => this.setState({ isAddPlanetOpen: true })}
          >
            <LinkIcon size={15} icon={Plus} />
            Add Planet
          </Button>
        </FlexContainer>
      </SectionHeader>
    );
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
        {this.renderPlanetsHeader()}
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
        <PlanetEditModal
          systemKey={this.props.system.key}
          isOpen={this.state.isAddPlanetOpen}
          onClose={() => this.setState({ isAddPlanetOpen: false })}
          onSubmit={this.onCreatePlanet}
        />
      </SidebarNavigation>
    );
  }
}
