import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { currentSectorSelector } from 'store/selectors/base.selectors';
import {
  isCurrentSectorSaved,
  isViewingSharedSector,
} from 'store/selectors/sector.selectors';
import { getCurrentEntityType } from 'store/selectors/entity.selectors';

import { openExport } from 'store/actions/sector.actions';
import DefaultActions from './default-actions';

const mapStateToProps = state => ({
  isSaved: isCurrentSectorSaved(state),
  isShared: isViewingSharedSector(state),
  currentSector: currentSectorSelector(state),
  entityType: getCurrentEntityType(state),
});

export default injectIntl(
  connect(mapStateToProps, { openExport })(DefaultActions),
);
