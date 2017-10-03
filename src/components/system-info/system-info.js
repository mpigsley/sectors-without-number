import React from 'react';
import PropTypes from 'prop-types';
import { map, union } from 'lodash';
import { RefreshCw } from 'react-feather';

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
import WorldTags from 'constants/world-tags';

import './style.css';

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
    editSystemName: PropTypes.func.isRequired,
    planetKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  constructor(props) {
    super(props);

    this.onSaveSystem = this.onSaveSystem.bind(this);
    this.state = {
      name: this.props.system.name,
      planets: map(this.props.system.planets, ({ key }) => key),
      isNotUnique: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.name !== nextProps.system.name) {
      this.setState({
        name: nextProps.system.name,
        planets: map(nextProps.system.planets, ({ key }) => key),
      });
    }
  }

  onSaveSystem() {
    const nameKey = encodeURIComponent(this.state.name.toLowerCase());
    if (this.props.planetKeys.indexOf(nameKey) >= 0) {
      this.setState({ isNotUnique: true });
    } else {
      this.props.editSystemName(this.props.system.key, this.state.name);
      this.onClose();
    }
  }

  getPlanetNameOptions() {
    return union(
      map(this.props.system.planets, ({ name, key }) => ({
        value: key,
        label: name,
      })),
      this.state.planets,
    );
  }

  render() {
    return (
      <SidebarNavigation
        name={this.props.system.name}
        back={`/sector${this.props.location.search}`}
        type={SidebarType.system}
        onEdit={this.onEdit}
      >
        <SectionHeader>Planets</SectionHeader>
        {map(this.props.system.planets, (planet, key) => (
          <SidebarLinkRow
            key={planet.name}
            to={`${this.props.location.pathname}/planet/${key}${this.props
              .location.search}`}
          >
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
        ))}
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
              onChange={this.onEditDropdown('planets')}
              options={this.getPlanetNameOptions()}
              promptTextCreator={label => `Generate new planet '${label}'`}
              newOptionCreator={({ label, labelKey, valueKey }) => ({
                [labelKey]: label,
                [valueKey]: encodeURIComponent(label.toLowerCase()),
              })}
            />
          </FlexContainer>
        </Modal>
      </SidebarNavigation>
    );
  }
}
