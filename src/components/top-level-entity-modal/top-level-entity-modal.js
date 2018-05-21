import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHintFactory from 'react-hint';
import { FormattedMessage, intlShape } from 'react-intl';
import filter from 'lodash/filter';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import zipObject from 'lodash/zipObject';
import omit from 'lodash/omit';
import values from 'lodash/values';
import size from 'lodash/size';
import pickBy from 'lodash/pickBy';
import flatten from 'lodash/flatten';

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

import './style.css';

const ReactHint = ReactHintFactory(React);
const TopLevelLeveEntities = filter(Entities, entity => entity.topLevel);

export default class TopLevelEntityModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    topLevelKey: PropTypes.string,
    currentSector: PropTypes.string.isRequired,
    cancelTopLevelEntityCreate: PropTypes.func.isRequired,
    generateEntity: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    topLevelKey: '',
  };

  constructor(props) {
    super(props);

    this.currentSort = 0;
  }

  state = {
    name: Entities.system.nameGenerator(),
    children: this.generateChildrenNames(Entities.system.key),
    entityType: Entities.system.key,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen && !this.props.isOpen) {
      this.setState({
        name: Entities[this.state.entityType].nameGenerator(),
        children: this.generateChildrenNames(this.state.entityType),
      });
    }
  }

  onNewEntityName = () => {
    this.setState({ name: Entities[this.state.entityType].nameGenerator() });
  };

  onEditEntity = ({ target }) => {
    this.setState({ [target.dataset.key]: target.value });
  };

  onChangeChildType = (entityType, entityId) => item => {
    if (entityType !== item.value) {
      const oldEntity = this.state.children[entityType][entityId];
      this.setState({
        children: {
          ...this.state.children,
          [entityType]: omit(this.state.children[entityType], entityId),
          [item.value]: {
            ...this.state.children[item.value],
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
    this.setState({
      children: {
        ...this.state.children,
        [entityType]: {
          ...this.state.children[entityType],
          [entityId]: {
            ...this.state.children[entityType][entityId],
            name: target.value,
          },
        },
      },
    });
  };

  onChangeGenerate = (entityType, entityId) => ({ target }) => {
    this.setState({
      children: {
        ...this.state.children,
        [entityType]: {
          ...this.state.children[entityType],
          [entityId]: {
            ...this.state.children[entityType][entityId],
            generate: target.checked,
          },
        },
      },
    });
  };

  onNewChildName = (entityType, entityId) => {
    this.setState({
      children: {
        ...this.state.children,
        [entityType]: {
          ...this.state.children[entityType],
          [entityId]: {
            ...this.state.children[entityType][entityId],
            name: Entities[entityType].nameGenerator(),
          },
        },
      },
    });
  };

  onDeleteChild = (entityType, entityId) => {
    this.setState({
      children: pickBy(
        {
          ...this.state.children,
          [entityType]: omit(this.state.children[entityType], entityId),
        },
        size,
      ),
    });
  };

  onAddChild = () => {
    this.currentSort += 1;
    this.setState({
      children: {
        ...this.state.children,
        [Entities.planet.key]: {
          ...this.state.children[Entities.planet.key],
          [createId()]: {
            name: Entities.planet.nameGenerator(),
            generate: true,
            sort: this.currentSort,
          },
        },
      },
    });
  };

  onSubmit = () =>
    this.props.generateEntity(
      {
        name: this.state.name,
        entityType: this.state.entityType,
      },
      {
        generate: true,
        children: mapValues(this.state.children, child => values(child)),
        ...coordinatesFromKey(this.props.topLevelKey),
        parent: this.props.currentSector,
        parentEntity: Entities.sector.key,
      },
      this.props.intl,
    );

  generateChildrenNames(parentEntity) {
    let names = {};
    this.currentSort = 0;
    Entities[parentEntity].children.forEach(child => {
      const { children } = EntityGenerators[child].generateAll({
        additionalPointsOfInterest: true,
        sector: this.props.currentSector,
        parentEntity,
        parent: createId(),
      });
      names = {
        ...names,
        [child]: zipObject(
          children.map(createId),
          children.map(({ name }) => {
            this.currentSort += 1;
            return {
              name,
              generate: true,
              sort: this.currentSort,
            };
          }),
        ),
      };
    });
    return names;
  }

  renderEditRow = (entityType, { name, generate }, key) => (
    <FlexContainer
      className="TopLevelEntityModal-Planet"
      key={key}
      align="center"
    >
      <X
        className="TopLevelEntityModal-Delete"
        size={25}
        onClick={() => this.onDeleteChild(entityType, key)}
      />
      <Dropdown
        wrapperClassName="TopLevelEntityModal-Type"
        value={entityType}
        clearable={false}
        onChange={this.onChangeChildType(entityType, key)}
        options={Entities[this.state.entityType].children.map(child => ({
          value: child,
          label: this.props.intl.formatMessage({ id: Entities[child].name }),
        }))}
      />
      <IconInput
        className="TopLevelEntityModal-Name"
        name="name"
        icon={RefreshCw}
        value={name}
        onChange={this.onEditChild(entityType, key)}
        onIconClick={() => this.onNewChildName(entityType, key)}
      />
      <Input
        className="TopLevelEntityModal-Generate"
        onChange={this.onChangeGenerate(entityType, key)}
        checked={generate}
        name="checkbox"
        type="checkbox"
      />
    </FlexContainer>
  );

  renderChildren() {
    if (Entities[this.state.entityType].children.length) {
      return (
        <FlexContainer direction="column">
          <FlexContainer justify="spaceBetween" align="flexEnd">
            <Label>
              <FormattedMessage id="misc.children" />
            </Label>
            <Dice
              data-rh={this.props.intl.formatMessage({
                id: 'misc.selectGenerateEntity',
              })}
              size={22}
            />
          </FlexContainer>
          <FlexContainer direction="column">
            {flatten(
              map(this.state.children, (entities, entityType) =>
                map(entities, (child, key) => ({ entityType, child, key })),
              ),
            )
              .sort((a, b) => a.child.sort - b.child.sort)
              .map(({ entityType, child, key }) =>
                this.renderEditRow(entityType, child, key),
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
    return (
      <Modal
        width={600}
        isOpen={this.props.isOpen}
        onCancel={this.props.cancelTopLevelEntityCreate}
        title={this.props.intl.formatMessage({ id: 'misc.createEntity' })}
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
              value={this.state.entityType}
              clearable={false}
              onChange={item => {
                const entityType = (item || {}).value;
                this.setState({
                  entityType,
                  children: this.generateChildrenNames(entityType),
                });
              }}
              options={TopLevelLeveEntities.map(attr => ({
                value: attr.key,
                label: this.props.intl.formatMessage({ id: attr.name }),
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
                  entity: this.props.intl.formatMessage({
                    id: Entities[this.state.entityType].name,
                  }),
                }}
              />
            </Label>
            <IconInput
              id="name"
              name="name"
              data-key="name"
              icon={RefreshCw}
              value={this.state.name}
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
