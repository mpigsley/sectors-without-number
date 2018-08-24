import { connect } from 'react-redux';
import { push } from 'connected-react-router';
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

const mapDispatchToProps = dispatch => ({
  updateFaction: () => dispatch(updateFaction()),
  toRoute: route => dispatch(push(route)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FactionForm);
