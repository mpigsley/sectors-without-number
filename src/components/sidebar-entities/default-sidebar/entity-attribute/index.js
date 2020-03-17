import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import { getCurrentEntity } from 'store/selectors/entity.selectors';
import { isSidebarEditActiveSelector } from 'store/selectors/base.selectors';
import { updateEntityInEdit } from 'store/actions/sidebar.actions';
import { isViewingSharedSector } from 'store/selectors/sector.selectors';

import EntityAttribute from './entity-attribute';

const mapStateToProps = createStructuredSelector({
  entity: getCurrentEntity,
  isSidebarEditActive: isSidebarEditActiveSelector,
  isShared: isViewingSharedSector,
});

export default injectIntl(
  connect(mapStateToProps, { updateEntityInEdit })(EntityAttribute),
);
