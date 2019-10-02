import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import {
  factionFormSelector,
  currentEntitySelector,
  factionIsCreatingSelector,
} from 'store/selectors/base.selectors';
import { getCurrentPlanets } from 'store/selectors/entity.selectors';
import {
  currentFormHitPoints,
  isValidFactionForm,
} from 'store/selectors/faction.selectors';
import {
  updateFaction,
  updateFactionAsset,
  createBlankAsset,
  submitForm,
} from 'store/actions/faction.actions';

import FactionForm from './faction-form';

const mapStateToProps = createStructuredSelector({
  currentFaction: currentEntitySelector,
  isCreating: factionIsCreatingSelector,
  isValid: isValidFactionForm,
  form: factionFormSelector,
  homeworlds: getCurrentPlanets,
  hitPoints: currentFormHitPoints,
});

const mapDispatchToProps = (dispatch, props) => ({
  updateFaction: update => dispatch(updateFaction(update)),
  createBlankAsset: () => dispatch(createBlankAsset()),
  toRoute: route => dispatch(push(route)),
  updateFactionAsset: (key, update) =>
    dispatch(updateFactionAsset(key, update)),
  submitForm: () => dispatch(submitForm(props.intl)),
});

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(FactionForm),
);
