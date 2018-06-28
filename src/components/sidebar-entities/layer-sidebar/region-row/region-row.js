import React from 'react';
import PropTypes from 'prop-types';
import { Check, X } from 'constants/icons';

import FlexContainer from 'primitives/container/flex-container';
import Input from 'primitives/form/input';

import './style.css';

export default function RegionRow({
  regionId,
  region,
  regionEdit,
  updateRegion,
  cancelRegionEdit,
  submitRegionEdit,
}) {
  if (!regionId && !regionEdit) {
    return null;
  } else if (!regionId || regionId === regionEdit.regionId) {
    return (
      <FlexContainer className="RegionRow" align="center">
        <Check
          className="RegionRow-Icon RegionRow-Check"
          size={25}
          onClick={() => submitRegionEdit()}
        />
        <X
          className="RegionRow-Icon RegionRow-Close"
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
}

RegionRow.propTypes = {
  regionId: PropTypes.string,
  region: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isHidden: PropTypes.bool.isRequired,
  }),
  regionEdit: PropTypes.shape({
    regionId: PropTypes.string,
    name: PropTypes.string.isRequired,
    isHidden: PropTypes.bool.isRequired,
  }),
  updateRegion: PropTypes.func.isRequired,
  cancelRegionEdit: PropTypes.func.isRequired,
  submitRegionEdit: PropTypes.func.isRequired,
};

RegionRow.defaultProps = {
  regionId: null,
  region: null,
  regionEdit: {},
};
