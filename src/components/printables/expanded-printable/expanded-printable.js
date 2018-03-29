import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { intlShape, FormattedMessage } from 'react-intl';

import HexMap from 'components/hex-map';
import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';

import Entities from 'constants/entities';

import './style.css';
import '../style.css';

export default function ExpandedPrintable({ printable, entities, intl }) {
  const renderEntity = (entityId, entityType, entity) => {
    const conf = Entities[entityType];

    const blockAttributes = [];
    if (entity.tags) {
      blockAttributes.push(
        <div key="tags">
          <b>
            <FormattedMessage id="misc.tags" />:{' '}
          </b>
          {entity.tags
            .map(tag => intl.formatMessage({ id: `tags.${tag}` }))
            .join(', ')}
        </div>,
      );
    }
    if ((conf.attributes || []).length) {
      conf.attributes
        .filter(({ key }) => entity[key])
        .forEach(({ key, name }) =>
          blockAttributes.push(
            <div key={key}>
              <b>
                <FormattedMessage id={name} />:{' '}
              </b>
              {intl.messages[entity[key]] ? (
                <FormattedMessage id={entity[key]} />
              ) : (
                entity[key]
              )}
            </div>,
          ),
        );
    }
    if (entity.neighbors) {
      blockAttributes.push(
        <div key="neighbors">
          <b>
            <FormattedMessage id="misc.neighbors" />:{' '}
          </b>
          {entity.neighbors}
        </div>,
      );
    }
    if (entity.children) {
      blockAttributes.push(
        <div key="children">
          <b>
            <FormattedMessage id="misc.children" />:{' '}
          </b>
          {entity.children}
        </div>,
      );
    }
    if (entity.description) {
      blockAttributes.push(
        <div key="description">
          <b>
            <FormattedMessage id="misc.description" />:{' '}
          </b>
          {entity.description}
        </div>,
      );
    }
    let attrBlock = null;
    if (blockAttributes.length) {
      attrBlock = (
        <FlexContainer justify="flexEnd">
          <FlexContainer className="ExpandedPrintable-Block" direction="column">
            {blockAttributes}
          </FlexContainer>
        </FlexContainer>
      );
    }

    return (
      <FlexContainer
        key={entityId}
        direction="column"
        className="ExpandedPrintable-Entity"
      >
        <FlexContainer align="baseline" className="ExpandedPrintable-Header">
          <Header type={HeaderType.header2} dark>
            {entity.name}
          </Header>
          <Header
            type={HeaderType.header4}
            dark
            className="ExpandedPrintable-Type"
          >
            (<FormattedMessage id={conf.name} />
            {entity.location ? ` - ${entity.location}` : ''})
          </Header>
        </FlexContainer>
        {attrBlock}
      </FlexContainer>
    );
  };

  const renderEntities = () =>
    map(entities, (entityList, entityType) =>
      map(entityList, (entity, entityId) =>
        renderEntity(entityId, entityType, entity),
      ),
    );

  return (
    <div className="Printable">
      <div className="Printable-Container">
        <HexMap hexes={printable.hexes} viewbox={printable.viewbox} />
      </div>
      <div className="Printable-EntityContainer">{renderEntities()}</div>
    </div>
  );
}

ExpandedPrintable.propTypes = {
  entities: PropTypes.shape().isRequired,
  printable: PropTypes.shape({
    hexes: PropTypes.arrayOf(PropTypes.object).isRequired,
    viewbox: PropTypes.string.isRequired,
  }).isRequired,
  intl: intlShape.isRequired,
};
