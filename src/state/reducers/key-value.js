import { createReducer } from '@reduxjs/toolkit';
import { KEY_VALUE_INITIAL_STATE } from '../initialStates/key-value';

export const keyValueReducer = createReducer(KEY_VALUE_INITIAL_STATE, {
  SET_KEY_VALUE: (state, { payload: { key, value }}) => ({ ...state, [key]: value })
});
