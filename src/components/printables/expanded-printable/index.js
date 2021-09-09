import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { endPrint } from 'store/actions/sector.actions';
import { getPrintableEntities } from 'store/selectors/entity.selectors';
import { customTagSelector } from 'store/selectors/base.selectors';

import ExpendedPrintable from './expanded-printable';

const mapStateToProps = (state) => ({
  entities: getPrintableEntities(state),
  customTags: customTagSelector(state),
});

export default injectIntl(
  connect(mapStateToProps, { endPrint })(ExpendedPrintable),
);
