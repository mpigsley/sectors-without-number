import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import {
  getCurrentEntity,
  getCurrentEntityId,
  getCurrentEntityType,
} from 'store/selectors/entity.selectors';
import { isSidebarEditActiveSelector } from 'store/selectors/base.selectors';
import { updateEntityInEdit } from 'store/actions/sidebar.actions';
import { openCustomTagModal } from 'store/actions/tag.actions';
import { isViewingSharedSector } from 'store/selectors/sector.selectors';
import { getTagsForCurrentEntity } from 'store/selectors/tag.selectors';

import EntityTags from './entity-tags';

const mapStateToProps = createStructuredSelector({
  customTags: getTagsForCurrentEntity,
  entity: getCurrentEntity,
  entityId: getCurrentEntityId,
  entityType: getCurrentEntityType,
  isSidebarEditActive: isSidebarEditActiveSelector,
  isShared: isViewingSharedSector,
});

export default injectIntl(
  connect(
    mapStateToProps,
    { updateEntityInEdit, openCustomTagModal },
  )(EntityTags),
);
