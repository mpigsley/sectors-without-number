import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  factionFormSelector,
  factionIsCreatingSelector,
} from 'store/selectors/base.selectors';
import { updateFaction } from 'store/actions/faction.actions';

import FactionForm from './faction-form';

const mapStateToProps = createStructuredSelector({
  isCreating: factionIsCreatingSelector,
  form: factionFormSelector,
});

export default connect(
  mapStateToProps,
  { updateFaction },
)(FactionForm);
