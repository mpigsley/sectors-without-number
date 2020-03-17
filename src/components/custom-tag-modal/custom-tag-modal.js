import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Lock } from 'react-feather';
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
import { find, mapValues, map, sortBy } from 'constants/lodash';

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
  tags,
  createTag,
  editTag,
  deleteTag,
  isCustomTagModalOpen,
  closeCustomTagModal,
}) {
  const [isFormOpen, setIsFormOpen] = useState();
  const [selected, setSelected] = useState();
  const sortedWorldTags = useMemo(
    () =>
      sortBy(
        [
          ...map(tags, (tag, key) => ({ ...tag, key })),
          ...map(WorldTags, ({ key, ...lists }) => ({
            key,
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
        ],
        'name',
      ),
    [intl, tags],
  );
  const selectedTag = useMemo(() => find(sortedWorldTags, { key: selected }), [
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
        editTag={tagUpdate =>
          editTag(intl, selected, tagUpdate).then(() => setIsFormOpen(false))
        }
        createTag={newTag =>
          createTag(intl, newTag).then(newTagId => {
            setIsFormOpen(false);
            if (newTagId) {
              setSelected(newTagId);
            }
          })
        }
      />
    );
  } else if (selectedTag) {
    detailsContent = (
      <TagDetails
        intl={intl}
        selectedTag={selectedTag}
        onDelete={() => deleteTag(intl, selected).then(() => setSelected())}
        onEdit={() => setIsFormOpen(true)}
      />
    );
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
            {map(sortedWorldTags, ({ key, name, core }) => (
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
  tags: PropTypes.shape().isRequired,
  isCustomTagModalOpen: PropTypes.bool.isRequired,
  closeCustomTagModal: PropTypes.func.isRequired,
  createTag: PropTypes.func.isRequired,
  editTag: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired,
};
