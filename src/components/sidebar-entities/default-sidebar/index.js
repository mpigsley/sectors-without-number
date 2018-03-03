import { connect } from 'react-redux';

import {
  getCurrentEntityType,
  getCurrentEntityChildren,
} from 'store/selectors/entity.selectors';

import DefaultSidebar from './default-sidebar';

const mapStateToProps = state => ({
  entityType: getCurrentEntityType(state),
  entityChildren: getCurrentEntityChildren(state),
});

export default connect(mapStateToProps)(DefaultSidebar);
