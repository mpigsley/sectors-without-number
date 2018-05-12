import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FloatingToolbar from './floating-toolbar';

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps)(FloatingToolbar);
