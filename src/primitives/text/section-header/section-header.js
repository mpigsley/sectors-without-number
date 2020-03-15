import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, intlShape } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import LinkIcon from 'primitives/other/link-icon';
import Button from 'primitives/other/button';

import { ChevronRight, ChevronDown, Plus } from 'constants/icons';

import './style.scss';

export default function SectionHeader({
  intl,
  className,
  isOpen,
  onIconClick,
  header,
  onAdd,
  addItemTemplate,
  addItemName,
  additional,
  ...rest
}) {
  let chevron;
  if (isOpen === undefined) {
    chevron = null;
  } else if (isOpen) {
    chevron = (
      <ChevronDown
        className="SectionHeader-Icon"
        onClick={onIconClick}
        size={20}
      />
    );
  } else {
    chevron = (
      <ChevronRight
        className="SectionHeader-Icon"
        onClick={onIconClick}
        size={20}
      />
    );
  }

  let additionalItem = null;
  if (additional) {
    additionalItem = (
      <span className="SectionHeader-Additional">{additional}</span>
    );
  } else if (onAdd) {
    additionalItem = (
      <Button minimal className="SectionHeader-AddButton" onClick={onAdd}>
        <LinkIcon size={15} icon={Plus} />
        <FormattedMessage
          id={addItemTemplate}
          values={{
            entity: intl.formatMessage({
              id: addItemName,
            }),
          }}
        />
      </Button>
    );
  }

  let headerItem = header;
  if (typeof header === 'string') {
    headerItem = <FormattedMessage id={header} />;
  }

  return (
    <FlexContainer
      align="center"
      className={classNames('SectionHeader', className)}
      {...rest}
    >
      {chevron}
      <FlexContainer flex="1" justify="spaceBetween" align="flexEnd">
        <h3 className="SectionHeader-Inner">{headerItem}</h3>
        {additionalItem}
      </FlexContainer>
    </FlexContainer>
  );
}

SectionHeader.propTypes = {
  intl: intlShape.isRequired,
  header: PropTypes.node.isRequired,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  onIconClick: PropTypes.func,
  onAdd: PropTypes.func,
  addItemTemplate: PropTypes.string,
  addItemName: PropTypes.string,
  additional: PropTypes.node,
};

SectionHeader.defaultProps = {
  className: undefined,
  isOpen: undefined,
  onIconClick: () => {},
  onAdd: undefined,
  addItemTemplate: 'misc.addEntity',
  addItemName: '',
  additional: undefined,
};
