import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { FormattedMessage, intlShape } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import Input from 'primitives/form/input';

import './style.css';

export default function NoteSidebar({
  isSidebarEditActive,
  isAncestorHidden,
  updateEntityInEdit,
  note,
  intl,
}) {
  if (!isSidebarEditActive) {
    return (
      <ReactMarkdown
        source={(note.attributes || {}).content || ''}
        className="NoteSidebar-Display"
      />
    );
  }
  return (
    <FlexContainer
      direction="column"
      flex="1"
      className="NoteSidebar-Attributes"
    >
      <FlexContainer align="center" className="NoteSidebar-Attribute">
        <b className="NoteSidebar-Header">
          <FormattedMessage id="misc.name" />:
        </b>
        <Input
          className="NoteSidebar-Item"
          value={note.name}
          onChange={({ target }) => updateEntityInEdit({ name: target.value })}
        />
      </FlexContainer>
      <FlexContainer align="center" className="NoteSidebar-Attribute">
        <b className="NoteSidebar-Header">
          <FormattedMessage id="misc.isHidden" />:
        </b>
        <Input
          className="NoteSidebar-Item"
          type="checkbox"
          checked={!!note.isHidden || isAncestorHidden}
          disabled={isAncestorHidden}
          onChange={({ target } = {}) =>
            updateEntityInEdit({ isHidden: target.checked })
          }
        />
      </FlexContainer>
      <FlexContainer align="center" flex="1" className="NoteSidebar-Attribute">
        <Input
          type="textarea"
          placeholder={intl.formatMessage({ id: 'misc.noteContent' })}
          className="NoteSidebar-Textarea"
          value={(note.attributes || {}).content || ''}
          onChange={({ target } = {}) =>
            updateEntityInEdit({ attributes: { content: target.value } })
          }
        />
      </FlexContainer>
    </FlexContainer>
  );
}

NoteSidebar.propTypes = {
  isSidebarEditActive: PropTypes.bool.isRequired,
  isAncestorHidden: PropTypes.bool.isRequired,
  updateEntityInEdit: PropTypes.func.isRequired,
  note: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isHidden: PropTypes.bool,
    attributes: PropTypes.shape({
      content: PropTypes.string,
    }),
  }).isRequired,
  intl: intlShape.isRequired,
};
