import React from 'react';
import PropTypes from 'prop-types';
import { map, unionBy, difference, every, zipObject, isEqual } from 'lodash';
import { RefreshCw } from 'react-feather';
import Chance from 'chance';

import SidebarInfo from 'components/sidebar-info';
import SidebarNavigation, { SidebarType } from 'components/sidebar-navigation';
import SidebarLinkRow from 'components/sidebar-link-row';

import FlexContainer from 'primitives/containers/flex-container';
import Label from 'primitives/form/label';
import IconInput from 'primitives/form/icon-input';
import Header, { HeaderType } from 'primitives/text/header';
import SectionHeader from 'primitives/text/section-header';
import Modal from 'primitives/other/modal';
import Button from 'primitives/other/button';
import Dropdown from 'primitives/form/dropdown';

import { toCommaArray } from 'utils/common';
import { generateName } from 'utils/name-generator';
import { generatePlanet } from 'utils/sector-generator';
import WorldTags from 'constants/world-tags';

import './style.css';

const newOptionCreator = ({ label, labelKey, valueKey }) => ({
  [labelKey]: label,
  [valueKey]: encodeURIComponent(label.toLowerCase()),
});

const planetsToSave = (planets, planetOptions) => {
  const chance = new Chance();
  return zipObject(
    planetOptions.map(({ value }) => value),
    planetOptions.map(
      ({ value, label }) => planets[value] || generatePlanet(chance, label)(),
    ),
  );
};

const renderPlanetLinks = (planets, { pathname, search }) =>
  map(planets, (planet, key) => (
    <SidebarLinkRow key={planet.name} to={`${pathname}/planet/${key}${search}`}>
      <Header type={HeaderType.header4} className="SystemInfo-Name">
        {planet.name}
      </Header>
      <div className="SystemInfo-Tags">
        ({planet.tags
          .map(tag => WorldTags[tag].name)
          .map(toCommaArray)
          .join('')})
      </div>
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
      search: PropTypes.string,
    }).isRequired,
    editSystem: PropTypes.func.isRequired,
    planetKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  constructor(props) {
    super(props);

    this.onSaveSystem = this.onSaveSystem.bind(this);
    this.onDeleteSystem = this.onDeleteSystem.bind(this);
    this.state = {
      name: this.props.system.name,
      planets: map(this.props.system.planets, ({ name, key }) => ({
        label: name,
        value: key,
      })),
      isNotUnique: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.name !== nextProps.system.name ||
      !isEqual(nextProps.system.planets, this.props.system.planets)
    ) {
      this.setState({
        name: nextProps.system.name,
        planets: map(nextProps.system.planets, ({ name, key }) => ({
          label: name,
          value: key,
        })),
      });
    }
  }

  onSaveSystem() {
    if (!this.planetNamesUnique()) {
      this.setState({ isNotUnique: true });
    } else {
      this.props.editSystem(this.props.system.key, {
        name: this.state.name,
        planets: planetsToSave(this.props.system.planets, this.state.planets),
      });
      this.onClose();
    }
  }

  onDeleteSystem(systemId) {
    return () => {
      this.props.deleteSystem(systemId);
    };
  }

  planetNamesUnique() {
    const otherPlanets = difference(
      this.props.planetKeys,
      map(this.props.system.planets, ({ key }) => key),
    );
    return every(
      this.state.planets,
      ({ value }) => otherPlanets.indexOf(value) < 0,
    );
  }

  getPlanetNameOptions() {
    return unionBy(
      map(this.props.system.planets, ({ name, key }) => ({
        value: key,
        label: name,
      })),
      this.state.planets,
      'value',
    );
  }

  renderEditModal() {
    let errorText = null;
    if (this.state.isNotUnique) {
      errorText = (
        <div className="SidebarInfo-Error">
          Planet name must be unique in the sector.
        </div>
      );
    }

    return (
      <Modal
        isOpen={this.state.isOpen}
        onCancel={this.onClose}
        title="Edit System"
        actionButtons={[
          <Button primary key="save" onClick={this.onSaveSystem}>
            Save System
          </Button>,
        ]}
      >
        <FlexContainer direction="column">
          <Label noPadding htmlFor="name">
            System Name
          </Label>
          <IconInput
            id="name"
            name="name"
            data-key="name"
            icon={RefreshCw}
            value={this.state.name}
            onChange={this.onEditText({ isNotUnique: false })}
            onIconClick={this.onRandomizeName(generateName)}
          />
        </FlexContainer>
        <FlexContainer direction="column">
          <Label htmlFor="tags">Planets</Label>
          <Dropdown
            id="planets"
            name="planets"
            value={this.state.planets}
            multi
            dropUp
            allowCreate
            onChange={this.onEditDropdown('planets', { isNotUnique: false })}
            options={this.getPlanetNameOptions()}
            promptTextCreator={label => `Generate new planet '${label}'`}
            newOptionCreator={newOptionCreator}
          />
          {errorText}
        </FlexContainer>
      </Modal>
    );
  }

  render() {
    return (
      <SidebarNavigation
        name={this.props.system.name}
        back={`/sector${this.props.location.search}`}
        type={SidebarType.system}
        onEdit={this.onEdit}
        onDelete={this.onDeleteSystem(this.props.system.key)}
      >
        <SectionHeader>Planets</SectionHeader>
        {renderPlanetLinks(this.props.system.planets, this.props.location)}
        {this.renderEditModal()}
      </SidebarNavigation>
    );
  }
}
