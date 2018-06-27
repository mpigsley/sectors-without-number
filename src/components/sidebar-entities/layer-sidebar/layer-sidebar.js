import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import SectionHeader from 'primitives/text/section-header';
import LinkIcon from 'primitives/other/link-icon';
import Button from 'primitives/other/button';
import { EyeOff, Plus } from 'constants/icons';

import LayerForm from './layer-form';
import './style.css';

export default function LayerSidebar({
  intl,
  layer,
  isEditing,
  initializeRegionEdit,
}) {
  if (!layer || isEditing) {
    return <LayerForm />;
  }

  let hidden = null;
  if (layer.isHidden) {
    hidden = (
      <FlexContainer className="LayerSidebar-Hidden">
        <EyeOff size={18} />
        <span>
          The <b>{layer.name}</b> layer is hidden from players
        </span>
      </FlexContainer>
    );
  }

  let description = null;
  if (layer.description) {
    description = (
      <FlexContainer
        direction="column"
        className="LayerSidebar-DescriptionContainer"
      >
        <span className="LayerSidebar-Label">
          <FormattedMessage id="misc.description" />
        </span>
        <p className="LayerSidebar-Description">{layer.description}</p>
      </FlexContainer>
    );
  }

  return (
    <div>
      <FlexContainer className="LayerSidebar" direction="column" flex="1">
        {hidden}
        {description}
        <SectionHeader>
          <FlexContainer justify="spaceBetween" align="flexEnd">
            <FormattedMessage id="misc.regions" />
            <Button
              minimal
              className="LayerSidebar-AddButton"
              onClick={() => initializeRegionEdit()}
            >
              <LinkIcon size={15} icon={Plus} />
              <FormattedMessage
                id="misc.addEntity"
                values={{
                  entity: intl.formatMessage({ id: 'misc.region' }),
                }}
              />
            </Button>
          </FlexContainer>
        </SectionHeader>
      </FlexContainer>
    </div>
  );
}

LayerSidebar.propTypes = {
  intl: intlShape.isRequired,
  layer: PropTypes.shape({
    description: PropTypes.string,
    isHidden: PropTypes.bool.isRequired,
  }),
  isEditing: PropTypes.bool.isRequired,
  initializeRegionEdit: PropTypes.func.isRequired,
};

LayerSidebar.defaultProps = {
  layer: null,
};
