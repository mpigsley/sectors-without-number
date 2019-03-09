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
      <SectionHeader header="misc.hexSystemText" />

      <FlexContainer direction="column" className="SettingsSidebar-Content">
        <LabeledInput
          type="checkbox"
          label="misc.settings.showNumberOfChildren"
          labelWidth={labelWidth}
          checked={settings.showNumberOfChildren}
          onChange={({ target } = {}) =>
            updateSettings('showNumberOfChildren', target.checked)
          }
        />
        <LabeledInput
          type="checkbox"
          label="misc.settings.showEntityName"
          labelWidth={labelWidth}
          checked={settings.showEntityName}
          onChange={({ target } = {}) =>
            updateSettings('showEntityName', target.checked)
          }
        />
        <LabeledInput
          type="checkbox"
          label="misc.settings.showCoordinates"
          labelWidth={labelWidth}
          checked={settings.showCoordinates}
          onChange={({ target } = {}) =>
            updateSettings('showCoordinates', target.checked)
          }
        />
      </FlexContainer>
    </FlexContainer>
  );
}

SettingsSidebar.propTypes = {
  settings: PropTypes.shape({
    showNumberOfChildren: PropTypes.bool,
    showEntityName: PropTypes.bool,
    showCoordinates: PropTypes.bool,
  }).isRequired,
  updateSettings: PropTypes.func.isRequired,
};
