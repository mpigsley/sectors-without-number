import React, { Component } from 'react';
import ReactHintFactory from 'react-hint';
import PropTypes from 'prop-types';
import { X, EyeOff } from 'react-feather';
import { size, map } from 'lodash';
import { intlShape } from 'react-intl';

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
    updateNavSettings: PropTypes.func.isRequired,
    openHelp: PropTypes.func.isRequired,
    completeRoute: PropTypes.func.isRequired,
    removeRoute: PropTypes.func.isRequired,
    toggleVisibility: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  componentWillUnmount() {
    this.props.resetNavSettings();
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
            .map(({ from, to, isHidden, routeId }) => (
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
                    onClick={() => this.props.removeRoute(routeId)}
                  />
                  <Header type={HeaderType.header4} noMargin>
                    {from}
                  </Header>
                  <span className="NavigationSidebar-Additional">to</span>
                  <Header type={HeaderType.header4} noMargin>
                    {to}
                  </Header>
                </FlexContainer>
                <Input
                  className="NavigationSidebar-Checkbox"
                  checked={!!isHidden}
                  onChange={() => this.props.toggleVisibility(routeId)}
                  type="checkbox"
                />
              </FlexContainer>
            ))}
        </FlexContainer>
      </FlexContainer>
    );
  }

  render() {
    const { settings, updateNavSettings, openHelp, completeRoute } = this.props;
    const { color, type, width, isCreatingRoute } = settings;

    let cancelButton = null;
    if (isCreatingRoute) {
      cancelButton = (
        <Button
          className="NavigationSidebar-Cancel"
          onClick={this.props.resetNavSettings}
        >
          Cancel
        </Button>
      );
    }

    let helpButton = null;
    if (!isCreatingRoute) {
      helpButton = (
        <Button minimal onClick={openHelp}>
          Routing Help
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
        <ReactHint events position="left" />
      </div>
    );
  }
}
