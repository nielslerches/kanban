import { createReducer } from '@reduxjs/toolkit';
import { PROJECTS_INITIAL_STATE } from "../initialStates/projects";

export const projectsReducer = createReducer(PROJECTS_INITIAL_STATE, {
  CREATE_PROJECT: (state, { payload: { id, name, description } }) => {
    state.data[id] = {
      id,
      name,
      description,
    };
    state.ids.push(id);
  },
  EDIT_PROJECT: (state, { payload: { id, name, description } }) => {
    state.data[id].name = name;
    state.data[id].description = description;
  },
});
