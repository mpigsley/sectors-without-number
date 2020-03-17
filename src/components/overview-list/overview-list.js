import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import ActionHeader from 'primitives/text/action-header';
import LinkRow from 'primitives/other/link-row';

import { generateCSV, createCSVDownload } from 'utils/export';
import { map, reduce, size } from 'constants/lodash';
import { usePrevious } from 'utils/effects';
import Entities from 'constants/entities';

import styles from './styles.module.scss';

const EXPORT_COLUMNS = [
  { id: 'misc.name', accessor: 'name' },
  { id: 'misc.entityType', accessor: 'entityType' },
  { id: 'misc.location', accessor: 'location' },
  { id: 'misc.children', accessor: 'children' },
  { id: 'misc.neighbors', accessor: 'neighbors' },
  { id: 'misc.parent', accessor: 'parent' },
  { id: 'misc.occupation', accessor: 'occupation' },
  { id: 'misc.situation', accessor: 'situation' },
  { id: 'misc.tags', accessor: 'tags' },
];

export default function OverviewList({
  openCustomTagModal,
  customTags,
  toSafeRoute,
  children,
  currentSector,
  currentSectorId,
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

  const exportTable = () => {
    const table = [
      EXPORT_COLUMNS.map(({ id }) => intl.formatMessage({ id })),
    ].concat(
      reduce(
        entities,
        (list, entityTypeList, entityType) => [
          ...list,
          ...map(entityTypeList, data =>
            EXPORT_COLUMNS.map(({ accessor }) => {
              if (accessor === 'entityType') {
                return intl.formatMessage({ id: `entity.${entityType}` });
              }
              if (!data[accessor]) {
                return '';
              }
              if (accessor === 'tags') {
                return data[accessor]
                  .map(tag =>
                    intl.formatMessage({
                      id: `tags.${tag}`,
                      defaultMessage: (customTags[tag] || {}).name,
                    }),
                  )
                  .filter(tag => tag)
                  .join(', ');
              }
              return intl.formatMessage({
                id: data[accessor],
                defaultMessage: `${data[accessor]}` || '',
              });
            }),
          ),
        ],
        [],
      ),
    );
    return createCSVDownload(generateCSV(table), currentSector.name);
  };

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
              onClick: exportTable,
            },
            {
              key: 'manage-tags',
              children: intl.formatMessage({ id: 'misc.manageCustomTags' }),
              onClick: openCustomTagModal,
            },
          ]}
        />
        <div className={styles.list}>
          {map(entities, (entityList, entityType) => (
            <LinkRow
              key={entityType}
              to={`/overview/${currentSectorId}/${entityType}`}
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
  currentSector: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  currentSectorId: PropTypes.string.isRequired,
  entities: PropTypes.shape().isRequired,
  customTags: PropTypes.shape().isRequired,
  isInitialized: PropTypes.bool.isRequired,
  doesNotExist: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      entityType: PropTypes.string,
    }).isRequired,
  }).isRequired,
  intl: intlShape.isRequired,
};
