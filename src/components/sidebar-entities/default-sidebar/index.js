import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getCurrentEntity,
  getCurrentEntityType,
  getCurrentEntityChildren,
} from 'store/selectors/entity.selectors';
import { isViewingSharedSector } from 'store/selectors/sector.selectors';
import { isSidebarEditActiveSelector } from 'store/selectors/base.selectors';

import DefaultSidebar from './default-sidebar';

const mapStateToProps = createStructuredSelector({
  isShared: isViewingSharedSector,
  isSidebarEditActive: isSidebarEditActiveSelector,
  entity: getCurrentEntity,
  entityType: getCurrentEntityType,
  entityChildren: getCurrentEntityChildren,
});

export default connect(mapStateToProps)(DefaultSidebar);
