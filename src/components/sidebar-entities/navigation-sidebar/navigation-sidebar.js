import React from 'react';
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

export default function NavigationSidebar() {
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
        <ColorPicker onChange={() => {}} />
      </div>
      <FlexContainer className="NavigationSidebar-FormRow">
        <FlexContainer
          className="NavigationSidebar-FormColumn"
          direction="column"
          flex={1}
        >
          <Label htmlFor="width" noPadding>
            Line Width
          </Label>
          <Dropdown
            id="width"
            name="width"
            clearable={false}
            value="normal"
            options={LINE_WIDTHS}
            onChange={() => {}}
          />
        </FlexContainer>
        <FlexContainer
          className="NavigationSidebar-FormColumn"
          direction="column"
          flex={1}
        >
          <Label htmlFor="type" noPadding>
            Line Type
          </Label>
          <Dropdown
            id="type"
            name="type"
            clearable={false}
            value="solid"
            options={LINE_TYPES}
            onChange={() => {}}
          />
        </FlexContainer>
      </FlexContainer>
      <FlexContainer
        className="NavigationSidebar-FormRow"
        justify="spaceBetween"
        align="flexEnd"
      >
        <Button>Create Route</Button>
        <Button minimal>Routing Help</Button>
      </FlexContainer>

      <SectionHeader>Navigation Routes</SectionHeader>
    </FlexContainer>
  );
}
