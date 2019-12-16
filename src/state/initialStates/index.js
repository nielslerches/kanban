import { DASHBOARDS_INITIAL_STATE } from './dashboards';
import { PANELS_INITIAL_STATE } from './panels';
import { KEY_VALUE_INITIAL_STATE } from './key-value';
import { PROJECTS_INITIAL_STATE } from './projects';
import { COLUMNS_INITIAL_STATE } from './columns';

export const initialState = {
  dashboards: DASHBOARDS_INITIAL_STATE,
  panels: PANELS_INITIAL_STATE,
  keyValue: KEY_VALUE_INITIAL_STATE,
  projects: PROJECTS_INITIAL_STATE,
  columns: COLUMNS_INITIAL_STATE,
};
