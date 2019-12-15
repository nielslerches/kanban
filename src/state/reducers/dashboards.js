import { DASHBOARDS_INITIAL_STATE } from "../initialStates/dashboards";

export const dashboardsReducer = (state = DASHBOARDS_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case 'CREATE_DASHBOARD':
      return {
        ...state,
        data: {
          ...state.data,
          [payload.id]: {
            id: payload.id,
            name: payload.name,
            panels: []
          }
        },
        ids: [...state.ids, payload.id]
      };

    case 'ADD_PANEL':
      return {
        ...state,
        data: {
          ...state.data,
          [payload.dashboardId]: {
            ...state.data[payload.dashboardId],
            panels: [
              ...state.data[payload.dashboardId].panels,
              {
                ordering: state.data[payload.dashboardId].panels.length,
                panelId: payload.panelId
              }
            ]
          }
        }
      };

    default:
      return state;
  }
};
