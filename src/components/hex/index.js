import { connect } from 'react-redux';

import {
  entityHoverStart,
  entityHoverEnd,
  entityHold,
  entityRelease,
} from 'store/actions/sector.actions';
import {
  holdKeySelector,
  hoverKeySelector,
} from 'store/selectors/base.selectors';
import { getCurrentTopLevelEntities } from 'store/selectors/entity.selectors';

import Hex from './hex';

const mapStateToProps = state => ({
  topLevelEntities: getCurrentTopLevelEntities(state),
  holdKey: holdKeySelector(state),
  hoverKey: hoverKeySelector(state),
  isCloudSave: false,
});

export default connect(mapStateToProps, {
  entityHoverStart,
  entityHoverEnd,
  entityHold,
  entityRelease,
})(Hex);
