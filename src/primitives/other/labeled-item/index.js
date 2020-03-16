import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import Label from 'primitives/form/label';

import styles from './styles.module.scss';

export default function LabeledItem({
  isVertical,
  isRequired,
  label,
  labelWidth,
  children,
  className,
}) {
  const requiredFlag = isRequired ? ' *' : '';
  let labelItem = label;
  if (typeof label === 'string') {
    labelItem = <FormattedMessage id={label} />;
  }
  return (
    <FlexContainer
      align="center"
      className={classNames(styles.container, className, {
        [styles['container--vertical']]: isVertical,
      })}
    >
      <Label
        noPadding
        style={{ minWidth: isVertical ? 'auto' : labelWidth }}
        className={styles.label}
      >
        {labelItem}
        {requiredFlag}
      </Label>
      <FlexContainer className={styles.item}>{children}</FlexContainer>
    </FlexContainer>
  );
}

LabeledItem.propTypes = {
  isVertical: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.node.isRequired,
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

LabeledItem.defaultProps = {
  isVertical: false,
  isRequired: false,
  labelWidth: '7rem',
  className: undefined,
};
