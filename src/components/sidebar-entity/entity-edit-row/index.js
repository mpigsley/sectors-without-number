import { connect } from 'react-redux';

import { deleteEntityInEdit } from 'store/actions/sector.actions';
import EntityEditRow from './entity-edit-row';

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { deleteEntityInEdit })(EntityEditRow);
