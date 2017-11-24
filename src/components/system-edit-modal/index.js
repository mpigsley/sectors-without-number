import { connect } from 'react-redux';

import {
  getCurrentEntity,
  getCurrentEntityType,
  getCurrentEntityChildren,
} from 'store/selectors/entity.selectors';
import { getEmptySystemKeys } from 'store/selectors/system.selectors';
import Entities from 'constants/entities';

import SystemEditModal from './system-edit-modal';

const mapStateToProps = state => ({
  system:
    getCurrentEntityType(state) === Entities.system.key
      ? getCurrentEntity(state)
      : undefined,
  planets:
    getCurrentEntityType(state) === Entities.system.key
      ? getCurrentEntityChildren(state).planet
      : undefined,
  emptySystemKeys: getEmptySystemKeys(state),
});

export default connect(mapStateToProps)(SystemEditModal);
