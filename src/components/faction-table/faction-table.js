import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Measure from 'react-measure';
import { FormattedMessage, intlShape } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import ButtonLink from 'primitives/other/button-link';
import Button from 'primitives/other/button';
import Table from 'primitives/other/table';

import { buildFactionTableColumns } from 'utils/faction';

import './style.css';

export default class FactionTable extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    table: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    children: PropTypes.node.isRequired,
    currentSector: PropTypes.string.isRequired,
    currentFaction: PropTypes.shape({}),
    currentElement: PropTypes.string,
  };

  static defaultProps = {
    currentFaction: undefined,
    currentElement: undefined,
  };

  get isSidebarOpen() {
    return !!this.props.currentFaction || !!this.props.currentElement;
  }

  render() {
    const { table, intl, children, currentSector } = this.props;

    return (
      <div
        className={classNames('FactionTable', {
          'FactionTable--sidebarOpen': this.isSidebarOpen,
        })}
      >
        <FlexContainer
          className="FactionTable-Header"
          justify="spaceBetween"
          align="flexEnd"
        >
          <Header type={HeaderType.header2} noMargin>
            <FormattedMessage id="misc.factions" />
          </Header>
          <FlexContainer>
            <ButtonLink
              to={`/elements/${currentSector}/faction/new`}
              minimal
              className="FactionTable-CreateAction"
            >
              <FormattedMessage id="misc.createFaction" />
            </ButtonLink>
            <Button minimal>
              <FormattedMessage
                id="misc.exportEntity"
                values={{ entity: intl.formatMessage({ id: 'misc.factions' }) }}
              />
            </Button>
          </FlexContainer>
        </FlexContainer>
        <Measure>
          {({ measureRef, contentRect }) => (
            <div ref={measureRef} className="FactionTable-Table">
              <Table
                sortable
                dataIdAccessor="key"
                columns={buildFactionTableColumns(
                  intl,
                  contentRect.entry.width,
                )}
                data={table}
              />
            </div>
          )}
        </Measure>
        <div className="FactionTable-Sidebar">{children}</div>
      </div>
    );
  }
}
