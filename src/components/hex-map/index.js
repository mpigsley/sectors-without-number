import { connect } from 'react-redux';

import { entityHover } from 'store/actions/sector.actions';
import {
  holdKeySelector,
  hoverKeySelector,
} from 'store/selectors/base.selectors';
import {
  getActiveEntityKey,
  getCurrentTopLevelEntities,
} from 'store/selectors/entity.selectors';
import HexMap from './hex-map';

const mapStateToProps = state => ({
  holdKey: holdKeySelector(state),
  hoverKey: hoverKeySelector(state),
  activeKey: getActiveEntityKey(state),
  topLevelEntities: getCurrentTopLevelEntities(state),
});

export default connect(mapStateToProps, { entityHover })(HexMap);
