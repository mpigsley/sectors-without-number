import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, intlShape } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import SectionHeader from 'primitives/text/section-header';
import LinkRow from 'primitives/other/link-row';
import Button from 'primitives/other/button';
import Modal from 'primitives/modal/modal';

import Entities from 'constants/entities';
import WorldTags from 'constants/world-tags';
import { Lock } from 'constants/icons';
import { mapValues, map, sortBy } from 'constants/lodash';

import styles from './styles.module.scss';

const renderList = (rows, key) => (
  <div key={key} className={styles.content}>
    <b>
      <FormattedMessage id={`misc.${key}`} />:
    </b>
    <ul className={styles.contentList}>
      {rows.map((row, i) => (
        <li key={`${key}-${i}`}>{row}</li> // eslint-disable-line
      ))}
    </ul>
  </div>
);

export default function CustomTagModal({
  intl,
  isCustomTagModalOpen,
  closeCustomTagModal,
}) {
  const [selected, setSelected] = useState();
  const sortedWorldTags = useMemo(
    () =>
      sortBy(
        mapValues(WorldTags, ({ key, ...lists }) => ({
          preconfigured: true,
          name: intl.formatMessage({ id: `tags.${key}` }),
          types: [Entities.planet.key],
          description: intl.formatMessage({ id: `tags.${key}.description` }),
          ...mapValues(lists, (listSize, listKey) =>
            [...Array(listSize).keys()].map(index =>
              intl.formatMessage({ id: `tags.${key}.${listKey}.${index}` }),
            ),
          ),
        })),
        'name',
      ),
    [intl],
  );
  const selectedTag = useMemo(() => sortedWorldTags[selected], [
    sortedWorldTags,
    selected,
  ]);

  let detailsContent = (
    <FlexContainer
      flex="1"
      direction="column"
      align="center"
      justify="center"
      className={styles.empty}
    >
      <Header type={HeaderType.header3} noMargin>
        <FormattedMessage id="misc.customTags" />
      </Header>
      <Header type={HeaderType.header4}>
        <FormattedMessage id="misc.addSelectTag" />
      </Header>
    </FlexContainer>
  );
  if (selectedTag) {
    const { preconfigured, name, description, types, ...lists } = selectedTag;
    detailsContent = (
      <FlexContainer flex="1" direction="column">
        <div className={styles.detailsContainer}>
          <Header type={HeaderType.header2}>{name}</Header>
          <FlexContainer justify="center">
            {preconfigured && (
              <Lock
                size={20}
                className={styles.detailsIcon}
                data-rh="Preconfigured Tag"
                data-rh-at="top"
              />
            )}
          </FlexContainer>
          <p>{description}</p>
          <p>
            <b className={styles.entityTypes}>
              <FormattedMessage id="misc.entityType" />:
            </b>
            {types
              .map(type => intl.formatMessage({ id: `entity.${type}` }))
              .join(', ')}
          </p>
          {map(lists, renderList)}
        </div>
        {!preconfigured && (
          <FlexContainer
            align="center"
            justify="flexEnd"
            className={styles.footer}
          >
            <Button noMargin>
              <FormattedMessage id="misc.edit" />
            </Button>
          </FlexContainer>
        )}
      </FlexContainer>
    );
  }

  return (
    <Modal
      hideFooter
      width="90%"
      className={styles.modal}
      contentClassName={styles.modalContent}
      isOpen={isCustomTagModalOpen}
      onCancel={closeCustomTagModal}
      title={intl.formatMessage({ id: 'misc.configureTags' })}
    >
      <FlexContainer className={styles.innerContainer}>
        <FlexContainer className={styles.tagsContainer} direction="column">
          <SectionHeader
            header="misc.tags"
            addItemName="misc.tag"
            className={styles.header}
            onAdd={() => {}}
          />
          <div className={styles.scrollable}>
            {map(sortedWorldTags, ({ name, preconfigured }, key) => (
              <LinkRow
                title={name}
                key={key}
                className={selected === key ? styles.selectedRow : null}
                additionalIcon={
                  preconfigured
                    ? ({ className, ...rest }) => (
                        <Lock
                          className={classNames(className, styles.rowIcon)}
                          {...rest}
                        />
                      )
                    : null
                }
                onClick={() => setSelected(key)}
              />
            ))}
          </div>
        </FlexContainer>
        {detailsContent}
      </FlexContainer>
    </Modal>
  );
}

CustomTagModal.propTypes = {
  intl: intlShape.isRequired,
  isCustomTagModalOpen: PropTypes.bool.isRequired,
  closeCustomTagModal: PropTypes.func.isRequired,
};
