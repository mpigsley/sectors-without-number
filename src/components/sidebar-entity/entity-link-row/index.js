import { connect } from 'react-redux';

import { currentSectorSelector } from 'store/selectors/base.selectors';

import EntityLinkRow from './entity-link-row';

const mapStateToProps = state => ({
  currentSector: currentSectorSelector(state),
});

export default connect(mapStateToProps)(EntityLinkRow);
