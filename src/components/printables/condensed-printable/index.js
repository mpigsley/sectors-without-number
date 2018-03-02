import { connect } from 'react-redux';

import { getPrintableEntities } from 'store/selectors/entity.selectors';
import CondensedPrintable from './condensed-printable';

const mapStateToProps = state => ({
  entities: getPrintableEntities(state),
});

export default connect(mapStateToProps)(CondensedPrintable);
