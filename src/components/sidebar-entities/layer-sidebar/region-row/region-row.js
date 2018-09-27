import React from 'react';
import PropTypes from 'prop-types';
import ReactHintFactory from 'react-hint';
import { FormattedMessage, intlShape } from 'react-intl';
import classNames from 'classnames';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import Input from 'primitives/form/input';

import { Check, X, Edit3, MoreHorizontal, EyeOff } from 'constants/icons';
import { LAYER_NAME_LENGTH } from 'constants/defaults';
import './style.css';

const ReactHint = ReactHintFactory(React);

export default function RegionRow({
  intl,
  isShared,
  regionId,
  region,
  regionForm,
  colorPicker,
  regionPaint,
  onDelete,
  updateRegionForm,
  initializeRegionForm,
  cancelRegionForm,
  submitRegionForm,
  openColorPicker,
  beginRegionPaint,
  closeRegionPaint,
  updateRegion,
}) {
  if (!regionId && !regionForm) {
    return null;
  }
  if (!regionId || regionId === (regionForm || {}).regionId) {
    const isOutOfRange = regionForm.name.length > 40;
    return (
      <FlexContainer className="RegionRow" align="center">
        <Check
          className={!isOutOfRange ? 'RegionRow-Icon' : 'RegionRow-Close'}
          size={25}
          onClick={() => {
            if (!isOutOfRange) {
              submitRegionForm();
            }
          }}
        />
        <X
          className="RegionRow-Close"
          size={25}
          onClick={() => cancelRegionForm()}
        />
        <Input
          value={regionForm.name}
          error={isOutOfRange}
          placeholder={intl.formatMessage(
            { id: 'misc.nameLimit' },
            { num: LAYER_NAME_LENGTH },
          )}
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
        <FormattedMessage
          id={region.isHidden ? 'misc.showEntity' : 'misc.hideEntity'}
          values={{ entity: intl.formatMessage({ id: 'misc.region' }) }}
        />
      </div>
      <div
        className="RegionRow-Option"
        onClick={() => initializeRegionForm(regionId)}
      >
        <FormattedMessage id="misc.editName" />
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

  let paintIcon;
  let moreIcon;
  if (!isShared) {
    moreIcon = (
      <MoreHorizontal
        {...{ [drodownAttr]: true }}
        className="RegionRow-OtherActions"
        size={25}
      />
    );
    paintIcon = (
      <Edit3
        className="RegionRow-Icon"
        size={20}
        onClick={() => beginRegionPaint(regionId)}
      />
    );
    if (regionId === regionPaint) {
      paintIcon = (
        <X
          data-paint={intl.formatMessage({ id: 'misc.selectToPaint' })}
          className="RegionRow-Close"
          size={20}
          onClick={() => closeRegionPaint()}
        />
      );
    }
  }

  return (
    <FlexContainer className="RegionRow" align="center">
      {paintIcon}
      <span
        {...(isShared ? {} : { 'data-color': true })}
        style={{ backgroundColor: region.color }}
        onClick={() =>
          colorPicker !== regionId && !isShared
            ? openColorPicker(regionId)
            : undefined
        }
        className={classNames('RegionRow-Color', {
          'RegionRow-Color--hoverable': !isShared,
        })}
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
      {moreIcon}
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
  intl: intlShape.isRequired,
  isShared: PropTypes.bool.isRequired,
  regionId: PropTypes.string,
  region: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    isHidden: PropTypes.bool.isRequired,
  }),
  regionForm: PropTypes.shape({
    regionId: PropTypes.string,
    name: PropTypes.string.isRequired,
    isHidden: PropTypes.bool.isRequired,
  }),
  colorPicker: PropTypes.string,
  regionPaint: PropTypes.string,
  onDelete: PropTypes.func,
  updateRegionForm: PropTypes.func.isRequired,
  initializeRegionForm: PropTypes.func.isRequired,
  cancelRegionForm: PropTypes.func.isRequired,
  submitRegionForm: PropTypes.func.isRequired,
  openColorPicker: PropTypes.func.isRequired,
  updateRegion: PropTypes.func.isRequired,
  beginRegionPaint: PropTypes.func.isRequired,
  closeRegionPaint: PropTypes.func.isRequired,
};

RegionRow.defaultProps = {
  regionId: null,
  region: null,
  regionForm: {},
  colorPicker: null,
  regionPaint: null,
  onDelete: () => {},
};
