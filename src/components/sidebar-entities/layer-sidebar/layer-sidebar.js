import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import { EyeOff } from 'constants/icons';

import LayerForm from './layer-form';
import './style.css';

export default function LayerSidebar({ layer }) {
  if (!layer) {
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
      <FlexContainer direction="column">
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
      </FlexContainer>
    </div>
  );
}

LayerSidebar.propTypes = {
  layer: PropTypes.shape({
    description: PropTypes.string,
    isHidden: PropTypes.bool.isRequired,
  }),
};

LayerSidebar.defaultProps = {
  layer: null,
};
