import { createId } from 'utils/common';

const ACTION_PREFIX = '@@faction';
export const UPDATE_FORM = `${ACTION_PREFIX}/UPDATE_FORM`;
export const CREATED_BLANK_ASSET = `${ACTION_PREFIX}/CREATED_BLANK_ASSET`;

export const updateFaction = update => ({ type: UPDATE_FORM, update });
export const createBlankAsset = () => ({
  type: CREATED_BLANK_ASSET,
  key: createId(),
});
