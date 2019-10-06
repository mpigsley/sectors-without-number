import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHintFactory from 'react-hint';
import { FormattedMessage, intlShape } from 'react-intl';

import Modal from 'primitives/modal/modal';
import Button from 'primitives/other/button';
import Label from 'primitives/form/label';
import IconInput from 'primitives/form/icon-input';
import Input from 'primitives/form/input';
import Dropdown from 'primitives/form/dropdown';
import FlexContainer from 'primitives/container/flex-container';
import Dice from 'primitives/icons/dice';
import Header, { HeaderType } from 'primitives/text/header';

import { RefreshCw, X, Plus } from 'constants/icons';
import Entities from 'constants/entities';
import { createId, coordinatesFromKey } from 'utils/common';
import EntityGenerators from 'utils/entity-generators';
import {
  filter,
  map,
  mapValues,
  zipObject,
  omit,
  values,
  size,
  pickBy,
  flatten,
} from 'constants/lodash';

import './style.scss';

const ReactHint = ReactHintFactory(React);
const TopLevelLevelEntities = filter(Entities, entity => entity.topLevel);
const generateChildrenNames = (parentEntity, currentSector) => {
  let names = {};
  let currentSort = 0;
  Entities[parentEntity].children.forEach(child => {
    const { children } = EntityGenerators[child].generateAll({
      additionalPointsOfInterest: true,
      sector: currentSector,
      parentEntity,
      parent: createId(),
    });
    names = {
      ...names,
      [child]: zipObject(
        children.map(createId),
        children.map(({ name }) => {
          currentSort += 1;
          return {
            name,
            generate: true,
            sort: currentSort,
          };
        }),
      ),
    };
  });
  return { children: names, currentSort };
};

export default class TopLevelEntityModal extends Component {
  constructor(props) {
    super(props);

    const { isOpen, currentSector } = props;
    this.state = {
      isOpen, // eslint-disable-line
      currentSort: 0,
      name: Entities.system.nameGenerator(),
      ...generateChildrenNames(Entities.system.key, currentSector),
      entityType: Entities.system.key,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isOpen && !state.isOpen) {
      return {
        isOpen: props.isOpen,
        name: Entities[state.entityType].nameGenerator(),
        ...generateChildrenNames(state.entityType, props.currentSector),
      };
    }
    return { ...state, isOpen: props.isOpen };
  }

  onNewEntityName = () => {
    const { entityType } = this.state;
    this.setState({ name: Entities[entityType].nameGenerator() });
  };

  onEditEntity = ({ target }) => {
    this.setState({ [target.dataset.key]: target.value });
  };

  onChangeChildType = (entityType, entityId) => item => {
    const { children } = this.state;
    if (entityType !== item.value) {
      const oldEntity = children[entityType][entityId];
      this.setState({
        children: {
          ...children,
          [entityType]: omit(children[entityType], entityId),
          [item.value]: {
            ...children[item.value],
            [entityId]: {
              ...oldEntity,
              name: Entities[item.value].nameGenerator(),
            },
          },
        },
      });
    }
  };

  onEditChild = (entityType, entityId) => ({ target }) => {
    const { children } = this.state;
    this.setState({
      children: {
        ...children,
        [entityType]: {
          ...children[entityType],
          [entityId]: {
            ...children[entityType][entityId],
            name: target.value,
          },
        },
      },
    });
  };

  onChangeGenerate = (entityType, entityId) => ({ target }) => {
    const { children } = this.state;
    this.setState({
      children: {
        ...children,
        [entityType]: {
          ...children[entityType],
          [entityId]: {
            ...children[entityType][entityId],
            generate: target.checked,
          },
        },
      },
    });
  };

  onNewChildName = (entityType, entityId) => {
    const { children } = this.state;
    this.setState({
      children: {
        ...children,
        [entityType]: {
          ...children[entityType],
          [entityId]: {
            ...children[entityType][entityId],
            name: Entities[entityType].nameGenerator(),
          },
        },
      },
    });
  };

  onDeleteChild = (entityType, entityId) => {
    const { children } = this.state;
    this.setState({
      children: pickBy(
        {
          ...children,
          [entityType]: omit(children[entityType], entityId),
        },
        size,
      ),
    });
  };

  onAddChild = () => {
    const { children, currentSort } = this.state;
    const nextSort = currentSort + 1;
    this.setState({
      currentSort: nextSort,
      children: {
        ...children,
        [Entities.planet.key]: {
          ...children[Entities.planet.key],
          [createId()]: {
            name: Entities.planet.nameGenerator(),
            generate: true,
            sort: nextSort,
          },
        },
      },
    });
  };

  onSubmit = () => {
    const { name, entityType, children } = this.state;
    const { generateEntity, currentSector, topLevelKey, intl } = this.props;
    generateEntity(
      { name, entityType },
      {
        generate: true,
        children: mapValues(children, child => values(child)),
        ...coordinatesFromKey(topLevelKey),
        parent: currentSector,
        parentEntity: Entities.sector.key,
      },
      intl,
    );
  };

  renderEditRow = (rowType, { name, generate }, key) => {
    const { entityType } = this.state;
    const { intl } = this.props;
    return (
      <FlexContainer
        className="TopLevelEntityModal-Planet"
        key={key}
        align="center"
      >
        <X
          className="TopLevelEntityModal-Delete"
          size={25}
          onClick={() => this.onDeleteChild(rowType, key)}
        />
        <Dropdown
          wrapperClassName="TopLevelEntityModal-Type"
          value={rowType}
          clearable={false}
          onChange={this.onChangeChildType(rowType, key)}
          options={Entities[entityType].children.map(child => ({
            value: child,
            label: intl.formatMessage({ id: Entities[child].name }),
          }))}
        />
        <IconInput
          className="TopLevelEntityModal-Name"
          name="name"
          icon={RefreshCw}
          value={name}
          onChange={this.onEditChild(rowType, key)}
          onIconClick={() => this.onNewChildName(rowType, key)}
        />
        <Input
          className="TopLevelEntityModal-Generate"
          onChange={this.onChangeGenerate(rowType, key)}
          checked={generate}
          name="checkbox"
          type="checkbox"
        />
      </FlexContainer>
    );
  };

  renderChildren() {
    const { entityType, children } = this.state;
    const { intl } = this.props;
    if (Entities[entityType].children.length) {
      return (
        <FlexContainer direction="column">
          <FlexContainer justify="spaceBetween" align="flexEnd">
            <Label>
              <FormattedMessage id="misc.children" />
            </Label>
            <Dice
              data-rh={intl.formatMessage({
                id: 'misc.selectGenerateEntity',
              })}
              size={22}
            />
          </FlexContainer>
          <FlexContainer direction="column">
            {flatten(
              map(children, (entities, type) =>
                map(entities, (child, key) => ({ type, child, key })),
              ),
            )
              .sort((a, b) => a.child.sort - b.child.sort)
              .map(({ type, child, key }) =>
                this.renderEditRow(type, child, key),
              )}
            <FlexContainer
              className="TopLevelEntityModal-Add"
              align="center"
              onClick={this.onAddChild}
            >
              <Plus className="TopLevelEntityModal-Plus" size={20} />
              <FormattedMessage id="misc.addChild" />
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      );
    }
    return (
      <FlexContainer justify="center">
        <Header
          type={HeaderType.header4}
          className="TopLevelEntityModal-EmptyText"
        >
          <FormattedMessage id="misc.selectedNoChilden" />
        </Header>
      </FlexContainer>
    );
  }

  render() {
    const {
      isOpen,
      cancelTopLevelEntityCreate,
      intl,
      currentSector,
    } = this.props;
    const { entityType, name } = this.state;
    return (
      <Modal
        width={600}
        isOpen={isOpen}
        onCancel={cancelTopLevelEntityCreate}
        title={intl.formatMessage({ id: 'misc.createEntity' })}
        actionButtons={[
          <Button primary key="create" onClick={this.onSubmit}>
            <FormattedMessage id="misc.create" />
          </Button>,
        ]}
      >
        <ReactHint events position="left" />
        <FlexContainer>
          <FlexContainer
            direction="column"
            className="TopLevelEntityModal-Type"
          >
            <Label noPadding htmlFor="name">
              <FormattedMessage id="misc.entityType" />
            </Label>
            <Dropdown
              value={entityType}
              clearable={false}
              onChange={item => {
                const newType = (item || {}).value;
                this.setState({
                  entityType: newType,
                  ...generateChildrenNames(newType, currentSector),
                });
              }}
              options={TopLevelLevelEntities.map(attr => ({
                value: attr.key,
                label: intl.formatMessage({ id: attr.name }),
              }))}
            />
          </FlexContainer>
          <FlexContainer
            direction="column"
            className="TopLevelEntityModal-Name"
          >
            <Label noPadding htmlFor="name">
              <FormattedMessage
                id="misc.entityName"
                values={{
                  entity: intl.formatMessage({
                    id: Entities[entityType].name,
                  }),
                }}
              />
            </Label>
            <IconInput
              id="name"
              name="name"
              data-key="name"
              icon={RefreshCw}
              value={name}
              onChange={this.onEditEntity}
              onIconClick={this.onNewEntityName}
            />
          </FlexContainer>
        </FlexContainer>
        {this.renderChildren()}
      </Modal>
    );
  }
}

TopLevelEntityModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  topLevelKey: PropTypes.string,
  currentSector: PropTypes.string.isRequired,
  cancelTopLevelEntityCreate: PropTypes.func.isRequired,
  generateEntity: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

TopLevelEntityModal.defaultProps = {
  topLevelKey: '',
};
