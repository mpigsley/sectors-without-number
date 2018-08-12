import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { endPrint } from 'store/actions/sector.actions';
import { getPrintableEntities } from 'store/selectors/entity.selectors';
import CondensedPrintable from './condensed-printable';

const mapStateToProps = state => ({
  entities: getPrintableEntities(state),
});

export default injectIntl(
  connect(
    mapStateToProps,
    { endPrint },
  )(CondensedPrintable),
);
