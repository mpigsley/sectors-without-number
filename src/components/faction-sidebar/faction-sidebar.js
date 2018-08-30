import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SidebarContainer from 'primitives/container/sidebar-container';
import SectionHeader from 'primitives/text/section-header';

import './style.css';

export default class FactionSidebar extends Component {
  static propTypes = {
    faction: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    faction: undefined,
  };

  state = {
    isAttributesOpen: true,
    isAssetsOpen: true,
  };

  render() {
    const { faction } = this.props;
    if (!faction) {
      return null;
    }
    const { isAttributesOpen, isAssetsOpen } = this.state;
    return (
      <SidebarContainer title={faction.name}>
        <SectionHeader
          isOpen={isAttributesOpen}
          onIconClick={() =>
            this.setState({ isAttributesOpen: !isAttributesOpen })
          }
          header="misc.attributes"
        />
        <SectionHeader
          isOpen={isAssetsOpen}
          onIconClick={() => this.setState({ isAssetsOpen: !isAssetsOpen })}
          header="misc.assets"
        />
      </SidebarContainer>
    );
  }
}
