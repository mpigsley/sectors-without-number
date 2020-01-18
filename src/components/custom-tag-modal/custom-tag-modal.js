import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, intlShape } from 'react-intl';

import TagDetails from 'components/custom-tag-modal/tag-details';
import TagForm from 'components/custom-tag-modal/tag-form';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import SectionHeader from 'primitives/text/section-header';
import LinkRow from 'primitives/other/link-row';
import Modal from 'primitives/modal/modal';

import Entities from 'constants/entities';
import WorldTags from 'constants/world-tags';
import { Lock } from 'constants/icons';
import { mapValues, map, sortBy } from 'constants/lodash';

import styles from './styles.module.scss';

const EmptyPlaceholder = () => (
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

export default function CustomTagModal({
  intl,
  isCustomTagModalOpen,
  closeCustomTagModal,
}) {
  const [isFormOpen, setIsFormOpen] = useState();
  const [selected, setSelected] = useState();
  const sortedWorldTags = useMemo(
    () =>
      sortBy(
        mapValues(WorldTags, ({ key, ...lists }) => ({
          core: true,
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

  const onTagSelect = key => {
    setIsFormOpen(false);
    setSelected(key);
  };

  let detailsContent = <EmptyPlaceholder />;
  if (isFormOpen) {
    detailsContent = (
      <TagForm
        intl={intl}
        selectedTag={selectedTag}
        onCancel={() => setIsFormOpen(false)}
      />
    );
  } else if (selectedTag) {
    detailsContent = <TagDetails intl={intl} selectedTag={selectedTag} />;
  }

  return (
    <Modal
      hideFooter
      width="90%"
      className={styles.modal}
      isOpen={isCustomTagModalOpen}
      onCancel={closeCustomTagModal}
      title={intl.formatMessage({ id: 'misc.configureTags' })}
    >
      <FlexContainer className={styles.innerContainer}>
        <FlexContainer className={styles.tagsContainer} direction="column">
          <SectionHeader
            header="misc.tags"
            addItemName="misc.tag"
            onAdd={() => {
              setSelected();
              setIsFormOpen(true);
            }}
          />
          <div className={styles.scrollable}>
            {map(sortedWorldTags, ({ name, core }, key) => (
              <LinkRow
                title={name}
                key={key}
                className={selected === key ? styles.selectedRow : null}
                additionalIcon={
                  core
                    ? ({ className, ...rest }) => (
                        <Lock
                          className={classNames(className, styles.rowIcon)}
                          {...rest}
                        />
                      )
                    : null
                }
                onClick={() => onTagSelect(key)}
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
