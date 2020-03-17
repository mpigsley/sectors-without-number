import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import {
  getCurrentEntity,
  getCurrentEntityId,
  getCurrentEntityType,
  getEntityAttributes,
  isAncestorHidden,
} from 'store/selectors/entity.selectors';
import { isSidebarEditActiveSelector } from 'store/selectors/base.selectors';
import { updateEntityInEdit } from 'store/actions/sidebar.actions';

import EntityAttributes from './entity-attributes';

const mapStateToProps = createStructuredSelector({
  entity: getCurrentEntity,
  entityId: getCurrentEntityId,
  entityType: getCurrentEntityType,
  entityAttributes: getEntityAttributes,
  isSidebarEditActive: isSidebarEditActiveSelector,
  isAncestorHidden,
});

export default injectIntl(
  connect(mapStateToProps, { updateEntityInEdit })(EntityAttributes),
);
