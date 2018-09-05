import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Measure from 'react-measure';
import { FormattedMessage, intlShape } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import ButtonLink from 'primitives/other/button-link';
import BasicLink from 'primitives/other/basic-link';
import Loading from 'primitives/regions/loading';
import Button from 'primitives/other/button';
import Table from 'primitives/other/table';

import { RotateCcw } from 'constants/icons';

import './style.css';

const buildFactionTableColumns = (intl, windowWidth) => {
  const columnConfig = [
    {
      accessor: 'name',
      Header: 'misc.name',
      width: 150,
    },
    {
      accessor: 'type',
      Header: 'misc.factionCategories',
      centered: true,
      width: 75,
    },
    {
      accessor: 'hitPoints',
      Header: 'misc.hitPoints',
      centered: true,
      width: 75,
    },
    {
      accessor: 'balance',
      Header: 'misc.balanceIncome',
      Cell: (balance, { income }) => {
        let incomeElement;
        if (income) {
          incomeElement = (
            <Fragment>
              <RotateCcw size={12} className="FactionTable-Income" />
              {income}
            </Fragment>
          );
        }
        return (
          <FlexContainer align="center" justify="center">
            {income ? `${balance} / ` : balance}
            {incomeElement}
          </FlexContainer>
        );
      },
      centered: true,
      width: 75,
    },
    {
      accessor: 'homeworld',
      Header: 'misc.homeworld',
      Cell: loc => <BasicLink to={loc.link}>{loc.name}</BasicLink>,
      centered: true,
      width: 100,
    },
    {
      accessor: 'experience',
      Header: 'misc.experience',
      centered: true,
      width: 75,
    },
    {
      accessor: 'goal',
      Header: 'misc.goal',
      Cell: goal => intl.formatMessage({ id: `faction.goal.${goal}` }),
      centered: true,
      width: 125,
    },
    {
      accessor: 'tags',
      Header: 'misc.tags',
      Cell: tags =>
        tags
          .map(tag => intl.formatMessage({ id: `faction.tags.${tag}` }))
          .join(', '),
      centered: true,
      width: 250,
    },
  ];

  return columnConfig.reduce(
    ({ columns, total }, { width, ...column }) => {
      if (windowWidth < total + width) {
        return { columns, total };
      }
      return { columns: [...columns, column], total: total + width };
    },
    { columns: [], total: 0 },
  ).columns;
};

export default class FactionTable extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    isLoading: PropTypes.bool.isRequired,
    table: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    children: PropTypes.node.isRequired,
    currentSector: PropTypes.string.isRequired,
    currentFaction: PropTypes.shape({}),
    currentElement: PropTypes.string,
    openSidebar: PropTypes.func.isRequired,
  };

  static defaultProps = {
    currentFaction: undefined,
    currentElement: undefined,
  };

  get isSidebarOpen() {
    return !!this.props.currentFaction || !!this.props.currentElement;
  }

  render() {
    const {
      isLoading,
      table,
      intl,
      children,
      currentSector,
      openSidebar,
    } = this.props;

    if (isLoading) {
      return <Loading />;
    }

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
                dataIdAccessor="key"
                onRowClick={openSidebar}
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
