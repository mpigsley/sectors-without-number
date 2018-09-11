import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { currentFactionAssets } from 'store/selectors/faction.selectors';

import FactionAssets from './faction-assets';

const mapStateToProps = createStructuredSelector({
  assets: currentFactionAssets,
});

export default connect(mapStateToProps)(FactionAssets);
