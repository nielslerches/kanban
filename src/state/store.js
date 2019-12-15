import { createStore, compose } from "redux";

import { rootReducer } from "./reducers";
import { BOARDS_INITIAL_STATE } from "./initialStates/boards";
import { COLUMNS_INITIAL_STATE } from "./initialStates/columns";
import { TASKS_INITIAL_STATE } from "./initialStates/tasks";

export const initStore = (initialState, enhancer) => {
  if (!initialState) {
    initialState = {
      boards: BOARDS_INITIAL_STATE,
      columns: COLUMNS_INITIAL_STATE,
      tasks: TASKS_INITIAL_STATE,
    };
  }

  return createStore(
    rootReducer,
    initialState,
    compose(
      enhancer ? enhancer : f => f,
    ),
  );
};
