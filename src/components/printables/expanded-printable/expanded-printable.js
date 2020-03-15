import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';

import MapPrintable from 'components/printables/map-printable';
import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';

import { map } from 'constants/lodash';
import Entities from 'constants/entities';

import './style.scss';
import '../style.scss';

export default function ExpandedPrintable({
  entities,
  printable,
  intl,
  endPrint,
  customTags,
}) {
  useEffect(() => {
    setTimeout(() => {
      window.print();
      endPrint();
    }, 1);
  }, [endPrint]);

  const renderEntity = (entityId, entityType, entity) => {
    const conf = Entities[entityType];

    const blockAttributes = [];
    if ((entity.tags || []).length) {
      blockAttributes.push(
        <div key="tags">
          <b className="ExpandedPrintable-Name">
            <FormattedMessage id="misc.tags" />:
          </b>
          {entity.tags
            .map(tag =>
              intl.formatMessage({
                id: `tags.${tag}`,
                defaultMessage: (customTags[tag] || {}).name,
              }),
            )
            .filter(tag => tag)
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
              <b className="ExpandedPrintable-Name">
                <FormattedMessage id={name} />:
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
          <b className="ExpandedPrintable-Name">
            <FormattedMessage id="misc.neighbors" />:
          </b>
          {entity.neighbors}
        </div>,
      );
    }
    if (entity.children) {
      blockAttributes.push(
        <div key="children">
          <b className="ExpandedPrintable-Name">
            <FormattedMessage id="misc.children" />:
          </b>
          {entity.children}
        </div>,
      );
    }
    if (entity.description) {
      blockAttributes.push(
        <div key="description">
          <b className="ExpandedPrintable-Name">
            <FormattedMessage id="misc.description" />:
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
      <div key={entityId} className="ExpandedPrintable-Entity">
        <FlexContainer align="baseline" className="ExpandedPrintable-Header">
          <Header type={HeaderType.header2} dark>
            {entity.name}
          </Header>
          <Header
            dark
            type={HeaderType.header4}
            className="ExpandedPrintable-Type"
          >
            (<FormattedMessage id={conf.name} />
            {entity.location ? ` - ${entity.location}` : ''})
          </Header>
        </FlexContainer>
        {attrBlock}
      </div>
    );
  };

  const renderEntities = () => {
    return map(entities, (entityList, entityType) =>
      map(entityList, (entity, entityId) =>
        renderEntity(entityId, entityType, entity),
      ),
    );
  };

  return (
    <div className="Printable">
      <div className="Printable-Container">
        <MapPrintable hexes={printable.hexes} viewbox={printable.viewbox} />
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
  endPrint: PropTypes.func.isRequired,
  customTags: PropTypes.shape().isRequired,
};
