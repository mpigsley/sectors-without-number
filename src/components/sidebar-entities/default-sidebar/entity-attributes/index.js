import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import {
  getCurrentEntity,
  getCurrentEntityId,
  getCurrentEntityType,
  isAncestorHidden,
} from 'store/selectors/entity.selectors';
import { isSidebarEditActiveSelector } from 'store/selectors/base.selectors';
import { updateEntityInEdit } from 'store/actions/sidebar.actions';
import { isViewingSharedSector } from 'store/selectors/sector.selectors';

import EntityAttributes from './entity-attributes';

const mapStateToProps = state => ({
  entity: getCurrentEntity(state),
  entityId: getCurrentEntityId(state),
  entityType: getCurrentEntityType(state),
  isSidebarEditActive: isSidebarEditActiveSelector(state),
  isAncestorHidden: isAncestorHidden(state),
  isShared: isViewingSharedSector(state),
});

export default injectIntl(
  connect(mapStateToProps, { updateEntityInEdit })(EntityAttributes),
);
