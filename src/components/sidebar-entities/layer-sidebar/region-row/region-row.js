import React from 'react';
import PropTypes from 'prop-types';
import ReactHintFactory from 'react-hint';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import Input from 'primitives/form/input';

import { Check, X, Edit3, MoreHorizontal, EyeOff } from 'constants/icons';
import './style.css';

const ReactHint = ReactHintFactory(React);

export default function RegionRow({
  regionId,
  region,
  regionEdit,
  colorPicker,
  regionPaint,
  onDelete,
  updateRegionForm,
  initializeRegionEdit,
  cancelRegionEdit,
  submitRegionEdit,
  openColorPicker,
  beginRegionPaint,
  closeRegionPaint,
  updateRegion,
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
          onChange={({ target }) => updateRegionForm({ name: target.value })}
        />
      </FlexContainer>
    );
  }

  const onRenderContent = () => (
    <FlexContainer
      className="RegionRow-OptionDropdown--content"
      direction="column"
    >
      <div
        className="RegionRow-Option"
        onClick={() => updateRegion(regionId, { isHidden: !region.isHidden })}
      >
        {region.isHidden ? 'Show' : 'Hide'} Region
      </div>
      <div
        className="RegionRow-Option"
        onClick={() => initializeRegionEdit(regionId)}
      >
        Edit Name
      </div>
      <div className="RegionRow-Option" onClick={() => onDelete(regionId)}>
        <FormattedMessage id="misc.delete" />
      </div>
    </FlexContainer>
  );

  const drodownAttr = `data-options-${regionId.toLowerCase()}`;

  let hidden = null;
  if (region.isHidden) {
    hidden = <EyeOff className="RegionRow-HiddenIcon" size={18} />;
  }

  let paintIcon = (
    <Edit3
      className="RegionRow-Icon"
      size={20}
      onClick={() => beginRegionPaint(regionId)}
    />
  );
  if (regionId === regionPaint) {
    paintIcon = (
      <X
        data-paint="Select hexes in sector to paint"
        className="RegionRow-Close"
        size={20}
        onClick={() => closeRegionPaint()}
      />
    );
  }

  return (
    <FlexContainer className="RegionRow" align="center">
      {paintIcon}
      <span
        data-color
        style={{ backgroundColor: region.color }}
        onClick={() =>
          colorPicker !== regionId ? openColorPicker(regionId) : undefined
        }
        className="RegionRow-Color"
      />
      <Header
        type={HeaderType.header4}
        className={classNames('RegionRow-Name', {
          'RegionRow-Name--hidden': region.isHidden,
        })}
      >
        {region.name}
      </Header>
      {hidden}
      <MoreHorizontal
        {...{ [drodownAttr]: true }}
        className="RegionRow-OtherActions"
        size={25}
      />
      <ReactHint
        autoPosition
        attribute={drodownAttr}
        className="RegionRow-OptionDropdown"
        events={{ click: true }}
        position="bottom"
        onRenderContent={onRenderContent}
      />
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
  regionPaint: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  updateRegionForm: PropTypes.func.isRequired,
  initializeRegionEdit: PropTypes.func.isRequired,
  cancelRegionEdit: PropTypes.func.isRequired,
  submitRegionEdit: PropTypes.func.isRequired,
  openColorPicker: PropTypes.func.isRequired,
  updateRegion: PropTypes.func.isRequired,
  beginRegionPaint: PropTypes.func.isRequired,
  closeRegionPaint: PropTypes.func.isRequired,
};

RegionRow.defaultProps = {
  regionId: null,
  region: null,
  regionEdit: {},
  colorPicker: null,
  regionPaint: null,
};
