import { connect } from 'react-redux';

import { currentSectorSelector } from 'store/selectors/base.selectors';
import { isCurrentOrAncestorHidden } from 'store/selectors/entity.selectors';

import EntityLinkRow from './entity-link-row';

const mapStateToProps = state => ({
  currentSector: currentSectorSelector(state),
  isCurrentOrAncestorHidden: isCurrentOrAncestorHidden(state),
});

export default connect(mapStateToProps)(EntityLinkRow);
