import { createId } from 'utils/common';

const ACTION_PREFIX = '@@faction';
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
