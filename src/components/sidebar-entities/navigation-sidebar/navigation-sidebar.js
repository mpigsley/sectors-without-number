import React, { Component } from 'react';
import ReactHintFactory from 'react-hint';
import PropTypes from 'prop-types';
import { X, EyeOff, Crosshair } from 'react-feather';
import { size, map } from 'lodash';
import { intlShape, FormattedMessage } from 'react-intl';

import Modal from 'primitives/modal/modal';
import ConfirmModal from 'primitives/modal/confirm-modal';
import Header, { HeaderType } from 'primitives/text/header';
import FlexContainer from 'primitives/container/flex-container';
import SectionHeader from 'primitives/text/section-header';
import ColorPicker from 'primitives/other/color-picker';
import LinkIcon from 'primitives/other/link-icon';
import Button from 'primitives/other/button';
import Dropdown from 'primitives/form/dropdown';
import Label from 'primitives/form/label';
import Input from 'primitives/form/input';

import { sortByKey } from 'utils/common';

import './style.css';

const ReactHint = ReactHintFactory(React);
const LINE_WIDTHS = [
  { value: 'thin', label: 'Thin' },
  { value: 'normal', label: 'Normal' },
  { value: 'wide', label: 'Wide' },
];
const LINE_TYPES = [
  { value: 'solid', label: 'Solid' },
  { value: 'dotted', label: 'Dotted' },
  { value: 'short', label: 'Short Dashes' },
  { value: 'long', label: 'Long Dashes' },
];

export default class NavigationSidebar extends Component {
  static propTypes = {
    settings: PropTypes.shape({
      color: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      width: PropTypes.string.isRequired,
      isCreatingRoute: PropTypes.bool.isRequired,
    }).isRequired,
    routes: PropTypes.shape().isRequired,
    resetNavSettings: PropTypes.func.isRequired,
    cancelNavigation: PropTypes.func.isRequired,
    updateNavSettings: PropTypes.func.isRequired,
    completeRoute: PropTypes.func.isRequired,
    removeRoute: PropTypes.func.isRequired,
    toggleVisibility: PropTypes.func.isRequired,
    locateRoute: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  state = {
    isHelpOpen: false,
    isConfirmDeleteOpen: false,
    deletionRoute: null,
  };

  componentWillUnmount() {
    this.props.resetNavSettings();
  }

  renderConfirmDeleteModal() {
    return (
      <ConfirmModal
        isOpen={this.state.isConfirmDeleteOpen}
        onConfirm={() => {
          this.props.removeRoute(this.state.deletionRoute);
          this.setState({ isConfirmDeleteOpen: false });
        }}
        onCancel={() => this.setState({ isConfirmDeleteOpen: false })}
      >
        <FormattedMessage
          id="misc.toDeleteEntity"
          values={{ entity: 'route' }}
        />
      </ConfirmModal>
    );
  }

  renderHelpModal() {
    return (
      <Modal
        width={600}
        title="Navigation Help"
        isOpen={this.state.isHelpOpen}
        cancelText={this.props.intl.formatMessage({ id: 'misc.continue' })}
        onCancel={() => this.setState({ isHelpOpen: false })}
      >
        <FlexContainer direction="column" align="flexStart">
          <Header type={HeaderType.header4} noMargin>
            Create Route
          </Header>
          <p>
            Decide what navigation line color, width, and type you would like to
            create and then select the &quot;Create Route&quot; button. Select
            any number of hexes to build your route. When you are finished,
            select &quot;Complete Route&quot; in the sidebar to sync it, or
            cancel if you would like to start over.
          </p>
          <Header type={HeaderType.header4} noMargin>
            Edit/Delete Route
          </Header>
          <p>
            In the &quot;Navigation Routes&quot; section, you can select the X
            to delete any route. There will be a confirmation of deletion. You
            can hide any route by clicking the checkbox to the right of the
            route name. To find a given route, you can click on the crosshair
            icon to highlight it on the map for an interval.
          </p>
          <Header type={HeaderType.header4} noMargin>
            Tips
          </Header>
          <p>
            Build routes only between two entities at a time. In this way, you
            can modify these routes individually in the future. In addition, if
            an entity is hidden and there are routes to that entity, those
            routes will be hidden automatically from your players.
          </p>
          <p>
            You can create a route and then edit line color, width, and type
            before completing the route to see the updates live.
          </p>
        </FlexContainer>
      </Modal>
    );
  }

  renderRoutes() {
    if (!size(this.props.routes)) {
      return null;
    }
    return (
      <FlexContainer direction="column">
        <SectionHeader>Navigation Routes</SectionHeader>
        <FlexContainer
          justify="flexEnd"
          align="center"
          className="NavigationSidebar-SubHeader"
        >
          <LinkIcon
            data-rh={this.props.intl.formatMessage({
              id: 'misc.selectHidden',
            })}
            className="NavigationSidebar-SubHeaderHidden"
            icon={EyeOff}
            size={18}
          />
        </FlexContainer>
        <FlexContainer direction="column">
          {map(this.props.routes, (route, routeId) => ({ ...route, routeId }))
            .sort(sortByKey('from'))
            .map(({ from, to, hiddenByEntity, isHidden, routeId }) => (
              <FlexContainer
                className="NavigationSidebar-NavItem"
                key={routeId}
                align="center"
                justify="spaceBetween"
              >
                <FlexContainer align="center">
                  <X
                    className="NavigationSidebar-Delete"
                    size={25}
                    onClick={() =>
                      this.setState({
                        isConfirmDeleteOpen: true,
                        deletionRoute: routeId,
                      })
                    }
                  />
                  <Crosshair
                    className="NavigationSidebar-Delete"
                    size={20}
                    onClick={() => this.props.locateRoute(routeId)}
                  />
                  <Header type={HeaderType.header4} noMargin>
                    {from}
                  </Header>
                  <span className="NavigationSidebar-Additional">to</span>
                  <Header type={HeaderType.header4} noMargin>
                    {to}
                  </Header>
                </FlexContainer>
                <span
                  data-rh={
                    hiddenByEntity
                      ? 'Route is hidden by hidden entity at endpoint'
                      : undefined
                  }
                >
                  <Input
                    className="NavigationSidebar-Checkbox"
                    disabled={hiddenByEntity}
                    checked={!!isHidden}
                    onChange={() => this.props.toggleVisibility(routeId)}
                    type="checkbox"
                  />
                </span>
              </FlexContainer>
            ))}
        </FlexContainer>
      </FlexContainer>
    );
  }

  render() {
    const { settings, updateNavSettings, completeRoute } = this.props;
    const { color, type, width, isCreatingRoute } = settings;

    let cancelButton = null;
    if (isCreatingRoute) {
      cancelButton = (
        <Button
          className="NavigationSidebar-Cancel"
          onClick={this.props.cancelNavigation}
        >
          Cancel
        </Button>
      );
    }

    let helpButton = null;
    if (!isCreatingRoute) {
      helpButton = (
        <Button minimal onClick={() => this.setState({ isHelpOpen: true })}>
          Navigation Help
        </Button>
      );
    }

    return (
      <div>
        <FlexContainer
          className="NavigationSidebar-Options"
          direction="column"
          flex="1"
        >
          <div className="NavigationSidebar-FormRow">
            <Label htmlFor="color" noPadding>
              Line Color
            </Label>
            <ColorPicker
              value={color}
              onChange={value => updateNavSettings('color', value)}
            />
          </div>
          <FlexContainer className="NavigationSidebar-FormRow">
            <FlexContainer
              className="NavigationSidebar-FormColumn"
              direction="column"
              flex="1"
            >
              <Label htmlFor="width" noPadding>
                Line Width
              </Label>
              <Dropdown
                id="width"
                name="width"
                clearable={false}
                value={width}
                options={LINE_WIDTHS}
                onChange={({ value }) => updateNavSettings('width', value)}
              />
            </FlexContainer>
            <FlexContainer
              className="NavigationSidebar-FormColumn"
              direction="column"
              flex="1"
            >
              <Label htmlFor="type" noPadding>
                Line Type
              </Label>
              <Dropdown
                id="type"
                name="type"
                clearable={false}
                value={type}
                options={LINE_TYPES}
                onChange={({ value }) => updateNavSettings('type', value)}
              />
            </FlexContainer>
          </FlexContainer>
          <FlexContainer
            className="NavigationSidebar-FormRow"
            justify="spaceBetween"
            align="flexEnd"
          >
            <span>
              <Button
                primary
                onClick={() =>
                  isCreatingRoute
                    ? completeRoute()
                    : updateNavSettings('isCreatingRoute', !isCreatingRoute)
                }
              >
                {isCreatingRoute ? 'Complete Route' : 'Create Route'}
              </Button>
              {cancelButton}
            </span>
            {helpButton}
          </FlexContainer>
          {this.renderRoutes()}
        </FlexContainer>
        {this.renderHelpModal()}
        {this.renderConfirmDeleteModal()}
        <ReactHint events position="left" />
      </div>
    );
  }
}
