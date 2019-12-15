import { createReducer } from '@reduxjs/toolkit';
import { PANELS_INITIAL_STATE } from "../initialStates/panels";

export const panelsReducer = createReducer(PANELS_INITIAL_STATE, {
  CREATE_PANEL: (state, { payload: { id, name, type, data } }) => {
    state.data[id] = {
      id,
      name,
      type,
      data
    };
    state.ids.push(id);
  }
});
