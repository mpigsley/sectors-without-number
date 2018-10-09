import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';

import ProfileModal from 'components/profile-modal';
import Header, { HeaderType } from 'primitives/text/header';
import FlexContainer from 'primitives/container/flex-container';
import LinkRow from 'primitives/other/link-row';

import { omitBy, map, size } from 'constants/lodash';
import Entities from 'constants/entities';

import './style.scss';

export default class OverviewList extends Component {
  static propTypes = {
    toSafeRoute: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    currentSector: PropTypes.string.isRequired,
    entities: PropTypes.shape().isRequired,
    isInitialized: PropTypes.bool.isRequired,
    doesNotExist: PropTypes.bool.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        entityType: PropTypes.string,
      }).isRequired,
    }).isRequired,
    intl: intlShape.isRequired,
  };

  componentDidUpdate(props) {
    const { isInitialized, doesNotExist, toSafeRoute } = this.props;
    if (!props.isInitialized && isInitialized && doesNotExist) {
      toSafeRoute();
    }
  }

  render() {
    const {
      entities,
      currentSector,
      children,
      intl,
      isInitialized,
      match,
    } = this.props;
    return (
      <>
        <FlexContainer>
          <FlexContainer
            direction="column"
            align="center"
            className="OverviewList"
          >
            <Header type={HeaderType.header2}>
              <FormattedMessage id="misc.entities" />
            </Header>
            <div className="OverviewList-List">
              {map(
                omitBy(
                  entities,
                  (list, type) =>
                    type === Entities.sector.key ||
                    Entities[type].action !== 'entity',
                ),
                (entityList, entityType) => (
                  <LinkRow
                    key={entityType}
                    to={`/overview/${currentSector}/${entityType}`}
                    title={intl.formatMessage({
                      id: Entities[entityType].name,
                    })}
                    additional={
                      isInitialized ? `${size(entityList)}` : undefined
                    }
                    arrowClassName="OverviewList-Arrow"
                    className={
                      match.params.entityType === entityType
                        ? 'OverviewList-Item--selected'
                        : ''
                    }
                  />
                ),
              )}
            </div>
          </FlexContainer>
          {children}
        </FlexContainer>
        <ProfileModal />
      </>
    );
  }
}
