import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import ActionHeader from 'primitives/text/action-header';
import LinkRow from 'primitives/other/link-row';

import { map, size } from 'constants/lodash';
import { usePrevious } from 'utils/effects';
import Entities from 'constants/entities';

import styles from './styles.module.scss';

export default function OverviewList({
  openCustomTagModal,
  toSafeRoute,
  children,
  currentSector,
  entities,
  isInitialized,
  doesNotExist,
  match,
  intl,
}) {
  const previousIsInitialized = usePrevious(isInitialized);
  useEffect(() => {
    if (!previousIsInitialized && isInitialized && doesNotExist) {
      toSafeRoute();
    }
  }, [previousIsInitialized, isInitialized, doesNotExist, toSafeRoute]);

  return (
    <FlexContainer>
      <FlexContainer
        direction="column"
        align="center"
        className={styles.container}
      >
        <ActionHeader
          title={intl.formatMessage({ id: 'misc.entities' })}
          actions={[
            {
              key: 'export',
              children: intl.formatMessage({ id: 'misc.exportAll' }),
              onClick: () => {},
            },
            {
              key: 'export',
              children: intl.formatMessage({ id: 'misc.manageCustomTags' }),
              onClick: openCustomTagModal,
            },
          ]}
        />
        <div className={styles.list}>
          {map(entities, (entityList, entityType) => (
            <LinkRow
              key={entityType}
              to={`/overview/${currentSector}/${entityType}`}
              title={intl.formatMessage({
                id: Entities[entityType].name,
              })}
              additional={isInitialized ? `${size(entityList)}` : undefined}
              arrowClassName={styles.arrow}
              className={
                match.params.entityType === entityType
                  ? styles.selectedItem
                  : ''
              }
            />
          ))}
        </div>
      </FlexContainer>
      {children}
    </FlexContainer>
  );
}

OverviewList.propTypes = {
  openCustomTagModal: PropTypes.func.isRequired,
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
