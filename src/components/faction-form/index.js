import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import {
  factionFormSelector,
  factionIsCreatingSelector,
} from 'store/selectors/base.selectors';
import { getCurrentPlanets } from 'store/selectors/entity.selectors';
import { isValidFactionForm } from 'store/selectors/faction.selectors';
import {
  updateFaction,
  updateFactionAsset,
  createBlankAsset,
} from 'store/actions/faction.actions';

import FactionForm from './faction-form';

const mapStateToProps = createStructuredSelector({
  isCreating: factionIsCreatingSelector,
  isValid: isValidFactionForm,
  form: factionFormSelector,
  homeworlds: getCurrentPlanets,
});

const mapDispatchToProps = dispatch => ({
  updateFaction: update => dispatch(updateFaction(update)),
  createBlankAsset: () => dispatch(createBlankAsset()),
  toRoute: route => dispatch(push(route)),
  updateFactionAsset: (key, update) =>
    dispatch(updateFactionAsset(key, update)),
});

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(FactionForm),
);
