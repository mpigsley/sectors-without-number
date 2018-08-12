import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import {
  getCurrentEntity,
  isAncestorHidden,
} from 'store/selectors/entity.selectors';
import { isSidebarEditActiveSelector } from 'store/selectors/base.selectors';
import { updateEntityInEdit } from 'store/actions/sidebar.actions';

import NoteSidebar from './note-sidebar';

const mapStateToProps = state => ({
  note: getCurrentEntity(state),
  isSidebarEditActive: isSidebarEditActiveSelector(state),
  isAncestorHidden: isAncestorHidden(state),
});

export default injectIntl(
  connect(
    mapStateToProps,
    { updateEntityInEdit },
  )(NoteSidebar),
);
