import { connect } from 'react-redux';

import { getPrintableEntities } from 'store/selectors/entity.selectors';
import ExpendedPrintable from './expanded-printable';

const mapStateToProps = state => ({
  entities: getPrintableEntities(state),
});

export default connect(mapStateToProps)(ExpendedPrintable);
