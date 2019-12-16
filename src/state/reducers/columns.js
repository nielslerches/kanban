import { createReducer } from '@reduxjs/toolkit';
import { COLUMNS_INITIAL_STATE } from '../initialStates/columns';

export const columnsReducer = createReducer(COLUMNS_INITIAL_STATE, {
  CREATE_COLUMN: (state, { payload: { id, name, projectId, ordering }}) => {
    state.data[id] = {
      id,
      name,
      projectId,
      ordering,
    };
    state.ids.push(id);
  },
});
