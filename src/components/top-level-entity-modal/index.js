import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { cancelTopLevelEntityCreate } from 'store/actions/sector.actions';
import { generateEntity } from 'store/actions/entity.actions';
import { getCurrentTopLevelEntities } from 'store/selectors/entity.selectors';
import {
  topLevelKeySelector,
  currentSectorSelector,
} from 'store/selectors/base.selectors';
import { getTopLevelEntity } from 'utils/entity';

import TopLevelEntityModal from './top-level-entity-modal';

const mapStateToProps = state => {
  const topLevelKey = topLevelKeySelector(state);
  return {
    topLevelKey,
    currentSector: currentSectorSelector(state),
    isOpen:
      !!topLevelKey &&
      !!getTopLevelEntity(getCurrentTopLevelEntities(state), topLevelKey),
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    cancelTopLevelEntityCreate,
    generateEntity,
  })(TopLevelEntityModal),
);
