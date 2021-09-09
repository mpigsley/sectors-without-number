import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { getCurrentTopLevelEntities } from 'store/selectors/entity.selectors';

import MapPrintable from './map-printable';

const mapStateToProps = (state) => ({
  topLevelEntities: getCurrentTopLevelEntities(state),
});

export default injectIntl(connect(mapStateToProps)(MapPrintable));
