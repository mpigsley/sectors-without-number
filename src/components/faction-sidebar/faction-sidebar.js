import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';

import SidebarContainer from 'primitives/container/sidebar-container';
import SectionHeader from 'primitives/text/section-header';
import ConfirmModal from 'primitives/modal/confirm-modal';

import FactionAssets from './faction-assets';
import FactionAttributes from './faction-attributes';
import './style.scss';

export default class FactionSidebar extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    faction: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    currentSector: PropTypes.string.isRequired,
    currentFaction: PropTypes.string.isRequired,
    removeFaction: PropTypes.func.isRequired,
  };

  static defaultProps = {
    faction: undefined,
  };

  state = {
    isConfirmDeleteOpen: false,
    isAttributesOpen: true,
    isAssetsOpen: true,
  };

  render() {
    const {
      faction,
      intl,
      currentSector,
      currentFaction,
      removeFaction,
    } = this.props;
    if (!faction) {
      return null;
    }
    const { isAttributesOpen, isAssetsOpen, isConfirmDeleteOpen } = this.state;
    return (
      <SidebarContainer
        title={faction.name}
        actions={[
          {
            key: 'back',
            children: intl.formatMessage({ id: 'misc.back' }),
            to: `/elements/${currentSector}/faction`,
          },
          {
            key: 'edit',
            children: intl.formatMessage({ id: 'misc.edit' }),
            to: `/elements/${currentSector}/faction/${currentFaction}/edit`,
          },
          {
            key: 'delete',
            children: intl.formatMessage({ id: 'misc.delete' }),
            onClick: () => this.setState({ isConfirmDeleteOpen: true }),
          },
        ]}
      >
        <div>
          <SectionHeader
            isOpen={isAttributesOpen}
            onIconClick={() =>
              this.setState({ isAttributesOpen: !isAttributesOpen })
            }
            header="misc.attributes"
          />
          {isAttributesOpen && (
            <FactionAttributes
              className="FactionSidebar-Content"
              faction={faction}
            />
          )}
          <SectionHeader
            isOpen={isAssetsOpen}
            onIconClick={() => this.setState({ isAssetsOpen: !isAssetsOpen })}
            header="misc.assets"
          />
          {isAssetsOpen && <FactionAssets className="FactionSidebar-Content" />}
        </div>
        <ConfirmModal
          isOpen={isConfirmDeleteOpen}
          onConfirm={removeFaction}
          onCancel={() => this.setState({ isConfirmDeleteOpen: false })}
        >
          <FormattedMessage
            id="misc.toDeleteEntity"
            values={{
              entity: intl.formatMessage({ id: 'misc.faction' }),
            }}
          />
        </ConfirmModal>
      </SidebarContainer>
    );
  }
}
