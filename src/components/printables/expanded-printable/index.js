import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { endPrint } from 'store/actions/sector.actions';
import { getPrintableEntities } from 'store/selectors/entity.selectors';
import { isViewingSharedSector } from 'store/selectors/sector.selectors';
import ExpendedPrintable from './expanded-printable';

const mapStateToProps = state => ({
  entities: getPrintableEntities(state),
  isShared: isViewingSharedSector(state),
});

export default injectIntl(
  connect(mapStateToProps, { endPrint })(ExpendedPrintable),
);
