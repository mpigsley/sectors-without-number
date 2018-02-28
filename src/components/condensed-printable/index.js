import { connect } from 'react-redux';

import { getCurrentEntities } from 'store/selectors/entity.selectors';
import CondensedPrintable from './condensed-printable';

const mapStateToProps = state => ({
  entities: getCurrentEntities(state),
});

export default connect(mapStateToProps)(CondensedPrintable);
