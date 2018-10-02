import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { map, mapValues } from 'constants/lodash';

import EntityAttributes from './entity-attributes';
import EntityList from './entity-list';

export default class DefaultSidebar extends Component {
  static propTypes = {
    entityChildren: PropTypes.shape().isRequired,
    entityType: PropTypes.string,
  };

  static defaultProps = {
    entityType: undefined,
  };

  constructor(props) {
    super(props);

    const { entityType, entityChildren } = props;
    this.state = {
      entityType, // eslint-disable-line
      openLists: {
        ...mapValues(entityChildren, () => true),
        attributes: true,
        tags: true,
      },
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.entityType !== props.entityType) {
      return {
        ...state,
        entityType: props.entityType,
        openLists: {
          ...mapValues(props.entityChildren, () => true),
          attributes: true,
          tags: true,
        },
      };
    }
    return state;
  }

  toggleListOpen = entityType => () => {
    const { openLists } = this.state;
    this.setState({
      openLists: {
        ...openLists,
        [entityType]: !openLists[entityType],
      },
    });
  };

  render() {
    const { openLists } = this.state;
    const { entityChildren } = this.props;
    return (
      <>
        >
        <EntityAttributes
          isAttributesOpen={openLists.attributes}
          isTagsOpen={openLists.tags}
          toggleAttributesOpen={this.toggleListOpen('attributes')}
          toggleTagsOpen={this.toggleListOpen('tags')}
        />
        {map(entityChildren, (entities, entityType) => (
          <EntityList
            key={entityType}
            entities={entities}
            entityType={entityType}
            isOpen={openLists[entityType]}
            toggleListOpen={this.toggleListOpen(entityType)}
          />
        ))}
      </>
    );
  }
}
