import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import {
  factionFormSelector,
  factionIsCreatingSelector,
} from 'store/selectors/base.selectors';
import { getCurrentPlanets } from 'store/selectors/entity.selectors';
import { updateFaction } from 'store/actions/faction.actions';

import FactionForm from './faction-form';

const mapStateToProps = createStructuredSelector({
  isCreating: factionIsCreatingSelector,
  form: factionFormSelector,
  homeworlds: getCurrentPlanets,
});

const mapDispatchToProps = dispatch => ({
  updateFaction: update => dispatch(updateFaction(update)),
  toRoute: route => dispatch(push(route)),
});

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(FactionForm),
);
