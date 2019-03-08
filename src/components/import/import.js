import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import StarBackground from 'components/star-background';
import Header, { HeaderType } from 'primitives/text/header';
import ContentContainer from 'primitives/container/content-container';
import SubContainer from 'primitives/container/sub-container';
import LinkIcon from 'primitives/other/link-icon';
import Button from 'primitives/other/button';
import LabeledInput from 'primitives/form/labeled-input';

import { Zap } from 'constants/icons';

import './style.scss';

export default function Import({
  importSector,
  updateImport,
  json,
  isJsonValid,
  parsedSectors,
  sector,
  intl,
}) {
  const updateJson = ({ target }) => {
    updateImport('sector', undefined);
    updateImport('json', target.value);
  };

  const updateSector = ({ value }) => {
    updateImport('sector', value);
  };

  const isValid = () => !!sector;

  return (
    <StarBackground>
      <ContentContainer direction="column" align="center" justify="center">
        <Header type={HeaderType.header2}>
          <FormattedMessage id="misc.import" />
        </Header>
        <SubContainer
          className="Import-Form"
          noMargin
          direction="column"
          align="flexStart"
        >
          <LabeledInput
            className="Import-JsonInput"
            isVertical
            type="textarea"
            label="misc.jsonData"
            name="json"
            value={json}
            onChange={updateJson}
          />
          <span
            className={classNames(
              'Import-JsonValid',
              isJsonValid ? 'Yes' : 'No',
            )}
          >
            {isJsonValid
              ? intl.formatMessage({ id: 'misc.importJsonValid' })
              : intl.formatMessage({ id: 'misc.importJsonInvalid' })}
          </span>
          <LabeledInput
            isVertical
            type="dropdown"
            label="misc.selectSectorToImport"
            placeholder={intl.formatMessage({ id: 'misc.pleaseSelect' })}
            searchable={false}
            clearable={false}
            name="sector"
            value={sector}
            options={parsedSectors}
            onChange={updateSector}
          />
        </SubContainer>
        <SubContainer
          className="Import-PaddedButtons"
          wrap
          justify="center"
          align="center"
        >
          <Button disabled={!isValid()} onClick={() => importSector(sector)}>
            <LinkIcon icon={Zap} size="20" />
            <FormattedMessage id="misc.import" />
          </Button>
        </SubContainer>
      </ContentContainer>
    </StarBackground>
  );
}

Import.propTypes = {
  importSector: PropTypes.func.isRequired,
  updateImport: PropTypes.func.isRequired,
  json: PropTypes.string,
  isJsonValid: PropTypes.bool,
  parsedSectors: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
  sector: PropTypes.string,
  intl: intlShape.isRequired,
};

Import.defaultProps = {
  json: '',
  isJsonValid: false,
  sector: '',
  parsedSectors: [],
};
