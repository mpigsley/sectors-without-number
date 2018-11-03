import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import Chance from 'chance';

import Input from 'primitives/form/input';
import LabeledInput from 'primitives/form/labeled-input';
import LabeledItem from 'primitives/other/labeled-item';

import { keys, map, without } from 'constants/lodash';
import { RefreshCw } from 'constants/icons';

const chance = new Chance();

export default function EntityAttribute({
  isSidebarEditActive,
  updateEntityInEdit,
  entityAttribute,
  attribute,
  isShared,
  entity,
  intl,
}) {
  const { key, name, attributes } = attribute;
  const { visibility } = entity;
  if (!isSidebarEditActive) {
    if (!attributes || !entityAttribute || (visibility === false && isShared)) {
      return null;
    }

    return (
      <LabeledItem
        key={key}
        label={name}
        className={classNames({
          'EntityAttributes--itemHidden': visibility === false,
        })}
      >
        {attributes[entityAttribute] ? (
          <FormattedMessage id={attributes[entityAttribute].name} />
        ) : (
          entityAttribute
        )}
      </LabeledItem>
    );
  }

  return (
    <LabeledInput
      key={key}
      label={name}
      type="dropdown"
      allowCreate
      value={entityAttribute}
      onChange={item =>
        updateEntityInEdit({ attributes: { [key]: (item || {}).value } })
      }
      icon={RefreshCw}
      onItemClick={() =>
        updateEntityInEdit({
          attributes: {
            [key]: chance.pickone(without(keys(attributes), entityAttribute)),
          },
        })
      }
      options={[
        ...map(attributes, attr => ({
          value: attr.key,
          label: intl.formatMessage({ id: attr.name }),
        })),
        ...(entityAttribute && !attributes[entityAttribute]
          ? [{ value: entityAttribute, label: entityAttribute }]
          : []),
      ]}
      checkboxes={[
        <Input
          key="visibility"
          checked={
            (visibility || {})[`attr.${key}`] === undefined
              ? false
              : !(visibility || {})[`attr.${key}`]
          }
          onChange={({ target }) =>
            updateEntityInEdit({
              visibility: { [`attr.${key}`]: !target.checked },
            })
          }
          type="checkbox"
        />,
      ]}
    />
  );
}

EntityAttribute.propTypes = {
  isSidebarEditActive: PropTypes.bool.isRequired,
  updateEntityInEdit: PropTypes.func.isRequired,
  attribute: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    attributes: PropTypes.shape().isRequired,
  }).isRequired,
  entityAttribute: PropTypes.string,
  isShared: PropTypes.bool.isRequired,
  entity: PropTypes.shape({
    visibility: PropTypes.shape(),
  }).isRequired,
  intl: intlShape.isRequired,
};

EntityAttribute.defaultProps = {
  entityAttribute: undefined,
};
