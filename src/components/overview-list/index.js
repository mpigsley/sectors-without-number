import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import {
  getCurrentEntities,
  sectorDoesNotExist,
} from 'store/selectors/entity.selectors';
import {
  currentSectorSelector,
  isInitializedSelector,
} from 'store/selectors/base.selectors';
import OverviewList from './overview-list';

const mapStateToProps = createStructuredSelector({
  currentSector: currentSectorSelector,
  entities: getCurrentEntities,
  isInitialized: isInitializedSelector,
  doesNotExist: sectorDoesNotExist,
});

const mapDispatchToProps = dispatch => ({
  toSafeRoute: () => dispatch(push('/')),
});

export default injectIntl(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(OverviewList),
  ),
);
