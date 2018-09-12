import React from 'react';
import { intlShape } from 'react-intl';
import { without } from 'lodash';
import Chance from 'chance';

import Input from 'primitives/form/input';
import LabeledInput from 'primitives/form/labeled-input';

import { keys, map } from 'constants/lodash';
import { RefreshCw } from 'constants/icons';

const chance = new Chance();

export default function EntityAttributeEdit({
  entityAttributes,
  attribute,
  visibility,
  onChange,
  intl,
}) {
  return (
    <LabeledInput
      key={entityAttributes.key}
      label={entityAttributes.name}
      type="dropdown"
      allowCreate
      value={attribute}
      onChange={item => onChange({ attributes: { [key]: (item || {}).value } })}
      icon={RefreshCw}
      onItemClick={() =>
        onChange({
          attributes: {
            [entityAttributes.key]: chance.pickone(
              without(keys(entityAttributes.attributes), attribute),
            ),
          },
        })
      }
      options={[
        ...map(entityAttributes.attributes, attr => ({
          value: attr.key,
          label: intl.formatMessage({ id: attr.name }),
        })),
        ...(attribute && !entityAttributes.attributes[attribute]
          ? [{ value: attribute, label: attribute }]
          : []),
      ]}
      checkboxes={[
        <Input
          key="visibility"
          checked={
            (entity.visibility || {})[`attr.${entityAttributes.key}`] ===
            undefined
              ? false
              : !(entity.visibility || {})[`attr.${entityAttributes.key}`]
          }
          onChange={({ target }) =>
            onChange({
              visibility: { [`attr.${key}`]: !target.checked },
            })
          }
          type="checkbox"
        />,
      ]}
    />
  );
}
