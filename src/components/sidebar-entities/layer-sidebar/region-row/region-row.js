import React from 'react';
import PropTypes from 'prop-types';
import { Check, X, Edit3, MoreHorizontal } from 'constants/icons';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import Input from 'primitives/form/input';

import './style.css';

export default function RegionRow({
  regionId,
  region,
  regionEdit,
  colorPicker,
  updateRegion,
  cancelRegionEdit,
  submitRegionEdit,
  openColorPicker,
}) {
  if (!regionId && !regionEdit) {
    return null;
  } else if (!regionId || regionId === (regionEdit || {}).regionId) {
    return (
      <FlexContainer className="RegionRow" align="center">
        <Check
          className="RegionRow-Icon"
          size={25}
          onClick={() => submitRegionEdit()}
        />
        <X
          className="RegionRow-Close"
          size={25}
          onClick={() => cancelRegionEdit()}
        />
        <Input
          value={regionEdit.name}
          onChange={({ target }) => updateRegion({ name: target.value })}
        />
      </FlexContainer>
    );
  }

  return (
    <FlexContainer className="RegionRow" align="center">
      <Edit3 className="RegionRow-Icon" size={20} />
      <span
        data-color
        style={{ backgroundColor: region.color }}
        onClick={() =>
          colorPicker !== regionId ? openColorPicker(regionId) : undefined
        }
        className="RegionRow-Color"
      />
      <Header type={HeaderType.header4} className="RegionRow-Name">
        {region.name}
      </Header>
      <MoreHorizontal className="RegionRow-OtherActions" size={25} />
    </FlexContainer>
  );
}

RegionRow.propTypes = {
  regionId: PropTypes.string,
  region: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    isHidden: PropTypes.bool.isRequired,
  }),
  regionEdit: PropTypes.shape({
    regionId: PropTypes.string,
    name: PropTypes.string.isRequired,
    isHidden: PropTypes.bool.isRequired,
  }),
  colorPicker: PropTypes.string,
  updateRegion: PropTypes.func.isRequired,
  cancelRegionEdit: PropTypes.func.isRequired,
  submitRegionEdit: PropTypes.func.isRequired,
  openColorPicker: PropTypes.func.isRequired,
};

RegionRow.defaultProps = {
  regionId: null,
  region: null,
  regionEdit: {},
  colorPicker: null,
};
