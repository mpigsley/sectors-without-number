import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import { cancelTopLevelEntityCreate } from 'store/actions/sector.actions';
import { generateEntity } from 'store/actions/entity.actions';
import { topLevelEntityModalOpen } from 'store/selectors/entity.selectors';
import {
  customTagSelector,
  topLevelKeySelector,
  currentSectorSelector,
} from 'store/selectors/base.selectors';

import TopLevelEntityModal from './top-level-entity-modal';

const mapStateToProps = createStructuredSelector({
  topLevelKey: topLevelKeySelector,
  currentSector: currentSectorSelector,
  isOpen: topLevelEntityModalOpen,
  customTags: customTagSelector,
});

const mapDispatchToProps = (dispatch, props) => ({
  cancelTopLevelEntityCreate: () => dispatch(cancelTopLevelEntityCreate()),
  generateEntity: (entity, parameters) =>
    dispatch(generateEntity(entity, parameters, props.intl)),
});

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(TopLevelEntityModal),
);
