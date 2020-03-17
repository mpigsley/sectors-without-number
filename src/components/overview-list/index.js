import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import {
  getPrintableEntities,
  sectorDoesNotExist,
} from 'store/selectors/entity.selectors';
import {
  currentSectorSelector,
  isInitializedSelector,
} from 'store/selectors/base.selectors';
import { openCustomTagModal } from 'store/actions/tag.actions';

import OverviewList from './overview-list';

const mapStateToProps = createStructuredSelector({
  currentSector: currentSectorSelector,
  entities: getPrintableEntities,
  isInitialized: isInitializedSelector,
  doesNotExist: sectorDoesNotExist,
});

const mapDispatchToProps = dispatch => ({
  toSafeRoute: () => dispatch(push('/')),
  openCustomTagModal: () => dispatch(openCustomTagModal()),
});

export default injectIntl(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(OverviewList)),
);
