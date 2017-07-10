import { connect } from 'react-redux';

import { sectorHoverStart, sectorHoverEnd } from 'store/actions/sector.actions';
import System from './system';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  sectorHoverStart: (key) => {
    dispatch(sectorHoverStart(key));
  },
  sectorHoverEnd: (key) => {
    dispatch(sectorHoverEnd(key));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(System);
