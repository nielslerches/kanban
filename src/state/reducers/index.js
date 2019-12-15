import { combineReducers } from "redux";

import { dashboardsReducer } from './dashboards';
import { panelsReducer } from './panels';
import { keyValueReducer } from "./key-value";
import { projectsReducer } from "./projects";

export const rootReducer = combineReducers({
  dashboards: dashboardsReducer,
  panels: panelsReducer,
  keyValue: keyValueReducer,
  projects: projectsReducer,
});
