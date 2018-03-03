import { connect } from 'react-redux';

import {
  getCurrentEntity,
  isAncestorHidden,
} from 'store/selectors/entity.selectors';
import { isSidebarEditActiveSelector } from 'store/selectors/base.selectors';
import { updateEntityInEdit } from 'store/actions/sidebar-edit.actions';

import NoteSidebar from './note-sidebar';

const mapStateToProps = state => ({
  note: getCurrentEntity(state),
  isSidebarEditActive: isSidebarEditActiveSelector(state),
  isAncestorHidden: isAncestorHidden(state),
});

export default connect(mapStateToProps, { updateEntityInEdit })(NoteSidebar);
