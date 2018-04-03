import { connect } from 'react-redux';

import { holdKeySelector } from 'store/selectors/base.selectors';
import {
  getActiveEntityKey,
  getCurrentTopLevelEntities,
} from 'store/selectors/entity.selectors';
import HexMap from './hex-map';

const mapStateToProps = state => ({
  holdKey: holdKeySelector(state),
  activeKey: getActiveEntityKey(state),
  topLevelEntities: getCurrentTopLevelEntities(state),
});

export default connect(mapStateToProps)(HexMap);
