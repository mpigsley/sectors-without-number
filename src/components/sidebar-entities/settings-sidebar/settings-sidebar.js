import React from 'react';
import PropTypes from 'prop-types';

import FlexContainer from 'primitives/container/flex-container';
import LabeledInput from 'primitives/form/labeled-input';
import SectionHeader from 'primitives/text/section-header';

import './style.scss';

const labelWidth = '10rem';

export default function SettingsSidebar({ settings, updateSettings }) {
  return (
    <FlexContainer direction="column">
      <SectionHeader header="settings.hexSystemText" />

      <FlexContainer direction="column" className="SettingsSidebar-Content">
        <LabeledInput
          type="checkbox"
          label="settings.showEntityCount"
          labelWidth={labelWidth}
          checked={settings.showEntityCount}
          onChange={({ target } = {}) =>
            updateSettings('showEntityCount', target.checked)
          }
        />
        <LabeledInput
          type="checkbox"
          label="settings.showSystemName"
          labelWidth={labelWidth}
          checked={settings.showSystemName}
          onChange={({ target } = {}) =>
            updateSettings('showSystemName', target.checked)
          }
        />
        <LabeledInput
          type="checkbox"
          label="settings.showSystemNumber"
          labelWidth={labelWidth}
          checked={settings.showSystemNumber}
          onChange={({ target } = {}) =>
            updateSettings('showSystemNumber', target.checked)
          }
        />
      </FlexContainer>
    </FlexContainer>
  );
}

SettingsSidebar.propTypes = {
  settings: PropTypes.shape({
    showEntityCount: PropTypes.bool,
    showSystemName: PropTypes.bool,
    showSystemNumber: PropTypes.bool,
  }).isRequired,
  updateSettings: PropTypes.func.isRequired,
};
