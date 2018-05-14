import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import SectionHeader from 'primitives/text/section-header';
import ColorPicker from 'primitives/other/color-picker';
import Button from 'primitives/other/button';
import Dropdown from 'primitives/form/dropdown';
import Label from 'primitives/form/label';

import './style.css';

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
    resetNavSettings: PropTypes.func.isRequired,
    updateNavSettings: PropTypes.func.isRequired,
    openHelp: PropTypes.func.isRequired,
    completeRoute: PropTypes.func.isRequired,
  };

  componentWillUnmount() {
    this.props.resetNavSettings();
  }

  render() {
    const { settings, updateNavSettings, openHelp, completeRoute } = this.props;
    const { color, type, width, isCreatingRoute } = settings;
    return (
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
          <Button
            onClick={() =>
              isCreatingRoute
                ? completeRoute()
                : updateNavSettings('isCreatingRoute', !isCreatingRoute)
            }
          >
            {isCreatingRoute ? 'Complete Route' : 'Create Route'}
          </Button>
          <Button minimal onClick={openHelp}>
            Routing Help
          </Button>
        </FlexContainer>

        <SectionHeader>Navigation Routes</SectionHeader>
      </FlexContainer>
    );
  }
}
