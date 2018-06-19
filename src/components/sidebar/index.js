import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getCurrentEntityType } from 'store/selectors/entity.selectors';

import Sidebar from './sidebar';

const mapStateToProps = createStructuredSelector({
  entityType: getCurrentEntityType,
});

export default connect(mapStateToProps)(Sidebar);
