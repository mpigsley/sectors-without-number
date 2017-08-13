import { connect } from 'react-redux';

import PrintableSector from './printable-sector';

const mapStateToProps = ({ sector }) => ({
  systems: sector.generated.systems,
});

export default connect(mapStateToProps)(PrintableSector);
