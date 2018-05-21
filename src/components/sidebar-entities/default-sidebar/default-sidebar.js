import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import mapValues from 'lodash/mapValues';
import map from 'lodash/map';

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

  state = {
    openLists: {
      ...mapValues(this.props.entityChildren, () => true),
      attributes: true,
      tags: true,
    },
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.entityType !== this.props.entityType) {
      this.setState({
        openLists: {
          ...mapValues(nextProps.entityChildren, () => true),
          attributes: true,
          tags: true,
        },
      });
    }
  }

  toggleListOpen = entityType => () =>
    this.setState({
      openLists: {
        ...this.state.openLists,
        [entityType]: !this.state.openLists[entityType],
      },
    });

  render() {
    return (
      <Fragment>
        <EntityAttributes
          isAttributesOpen={this.state.openLists.attributes}
          isTagsOpen={this.state.openLists.tags}
          toggleAttributesOpen={this.toggleListOpen('attributes')}
          toggleTagsOpen={this.toggleListOpen('tags')}
        />
        {map(this.props.entityChildren, (entities, entityType) => (
          <EntityList
            key={entityType}
            entities={entities}
            entityType={entityType}
            isOpen={this.state.openLists[entityType]}
            toggleListOpen={this.toggleListOpen(entityType)}
          />
        ))}
      </Fragment>
    );
  }
}
