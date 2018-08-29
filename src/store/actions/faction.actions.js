import { push } from 'connected-react-router';

import {
  currentSectorSelector,
  currentEntitySelector,
  factionFormSelector,
  factionIsCreatingSelector,
} from 'store/selectors/base.selectors';
import { createFaction, editFaction } from 'store/api/faction';

import { SuccessToast, ErrorToast } from 'utils/toasts';
import { createId } from 'utils/common';

const ACTION_PREFIX = '@@faction';
export const CREATED = `${ACTION_PREFIX}/CREATED`;
export const EDITED = `${ACTION_PREFIX}/EDITED`;
export const UPDATED_FORM = `${ACTION_PREFIX}/UPDATED_FORM`;
export const UPDATED_ASSET_FORM = `${ACTION_PREFIX}/UPDATED_ASSET_FORM`;
export const CREATED_BLANK_ASSET = `${ACTION_PREFIX}/CREATED_BLANK_ASSET`;

export const updateFaction = update => ({ type: UPDATED_FORM, update });

export const updateFactionAsset = (key, update) => ({
  type: UPDATED_ASSET_FORM,
  key,
  update,
});

export const createBlankAsset = () => ({
  type: CREATED_BLANK_ASSET,
  key: createId(),
});

export const submitForm = intl => (dispatch, getState) => {
  const state = getState();
  const form = factionFormSelector(state);
  const sectorId = currentSectorSelector(state);
  const currentId = currentEntitySelector(state);
  const isCreating = factionIsCreatingSelector(state);

  const promise = isCreating
    ? createFaction(sectorId, form)
    : editFaction(sectorId, currentId, form);

  return promise
    .then(({ factionId, faction }) => {
      dispatch(
        SuccessToast({
          title: intl.formatMessage({ id: 'misc.sectorSaved' }),
          message: intl.formatMessage({ id: 'misc.yourSectorSaved' }),
        }),
      );
      dispatch({
        type: isCreating ? CREATED : EDITED,
        sectorId,
        factionId,
        faction,
      });
      dispatch(push(`/elements/${sectorId}/faction`));
    })
    .catch(err => {
      console.error(err);
      dispatch(
        ErrorToast({
          title: intl.formatMessage({ id: 'misc.error' }),
          message: intl.formatMessage({ id: 'misc.reportProblemPersists' }),
        }),
      );
    });
};
