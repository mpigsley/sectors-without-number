import { push } from 'connected-react-router';

import {
  currentSectorSelector,
  currentEntitySelector,
  factionFormSelector,
  factionIsCreatingSelector,
} from 'store/selectors/base.selectors';
import { createFaction, editFaction, deleteFaction } from 'store/api/faction';

import { SuccessToast, ErrorToast } from 'utils/toasts';
import { createId } from 'utils/common';
import { isNil, pickBy, omitBy } from 'constants/lodash';

const ACTION_PREFIX = '@@faction';
export const CREATED = `${ACTION_PREFIX}/CREATED`;
export const EDITED = `${ACTION_PREFIX}/EDITED`;
export const DELETED = `${ACTION_PREFIX}/DELETED`;
export const UPDATED_FORM = `${ACTION_PREFIX}/UPDATED_FORM`;
export const UPDATED_ASSET_FORM = `${ACTION_PREFIX}/UPDATED_ASSET_FORM`;
export const CREATED_BLANK_ASSET = `${ACTION_PREFIX}/CREATED_BLANK_ASSET`;

export const updateFaction = (update) => ({ type: UPDATED_FORM, update });

export const updateFactionAsset = (key, update) => ({
  type: UPDATED_ASSET_FORM,
  key,
  update,
});

export const createBlankAsset = () => ({
  type: CREATED_BLANK_ASSET,
  key: createId(),
});

export const submitForm = (intl) => (dispatch, getState) => {
  const state = getState();
  const { assets, ...form } = factionFormSelector(state);
  const sectorId = currentSectorSelector(state);
  const currentId = currentEntitySelector(state);
  const isCreating = factionIsCreatingSelector(state);

  const modifiedForm = omitBy(
    { ...form, assets: pickBy(assets || {}, ({ type }) => type) },
    isNil,
  );

  const promise = isCreating
    ? createFaction(sectorId, modifiedForm)
    : editFaction(sectorId, currentId, modifiedForm);

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
      dispatch(push(`/elements/${sectorId}/faction/${factionId}`));
    })
    .catch((err) => {
      console.error(err);
      dispatch(
        ErrorToast({
          title: intl.formatMessage({ id: 'misc.error' }),
          message: intl.formatMessage({ id: 'misc.reportProblemPersists' }),
        }),
      );
    });
};

export const removeFaction = (intl) => (dispatch, getState) => {
  const state = getState();
  const factionId = currentEntitySelector(state);
  if (!factionId) {
    return Promise.resolve();
  }
  const sectorId = currentSectorSelector(state);
  dispatch({ type: DELETED, sectorId, factionId });
  dispatch(push(`/elements/${sectorId}/faction`));
  return deleteFaction(sectorId, factionId)
    .then(() => {
      dispatch(
        SuccessToast({
          title: intl.formatMessage(
            { id: 'misc.entityDeleted' },
            { entity: intl.formatMessage({ id: 'misc.faction' }) },
          ),
          message: intl.formatMessage(
            { id: 'misc.successfullyRemoved' },
            { entity: intl.formatMessage({ id: 'misc.faction' }) },
          ),
        }),
      );
    })
    .catch((err) => {
      console.error(err);
      return dispatch(
        ErrorToast({
          title: intl.formatMessage({ id: 'misc.error' }),
          message: intl.formatMessage({ id: 'misc.reportProblemPersists' }),
        }),
      );
    });
};
