import { connect } from 'react-redux';

import PrintableSector from './printable-sector';

const mapStateToProps = state => ({
  systems: state.sector.systems,
});

export default connect(mapStateToProps)(PrintableSector);
