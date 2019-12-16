import React, { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import uuid from 'uuid/v4';
import { element, node, oneOf } from 'prop-types';
import slugify from 'slug';

const ServicesContext = createContext();

export const createServices = (state, dispatch) => {
  const getDashboards = (filter) => {
    if (!filter) filter = () => true;

    return state.dashboards.ids
      .map(id => state.dashboards.data[id])
      .map(dashboard => ({
        ...dashboard,
        slug: slugify(dashboard.name, { lower: true }),
        panels: getPanels((panel) => dashboard.panels.map(({ panelId }) => panelId).includes(panel.id))
      }))
      .filter(filter);
  };

  const getPanels = (filter) => {
    if (!filter) filter = () => true;

    return state.panels.ids
      .map(id => state.panels.data[id])
      .filter(filter);
  };

  const getDashboardBySlug = slug => getDashboards(dashboard => dashboard.slug === slug)[0];
  const getDefaultDashboard = () => getDashboards(dashboard => dashboard.id === state.keyValue['default-dashboard'])[0];

  const getProjects = (filter) => {
    if (!filter) filter = () => true;

    return state.projects.ids
      .map(id => state.projects.data[id])
      .map(project => ({
        ...project,
        slug: slugify(project.name, { lower: true }),
        columns: getColumns((column) => column.projectId === project.id),
      }))
      .filter(filter);
  };

  const getProjectById = (id) => getProjects((project) => project.id === id)[0];
  const getProjectBySlug = (slug) => getProjects((project) => project.slug === slug)[0];

  const createProject = (name, description) => {
    const id = uuid();

    dispatch({ type: 'CREATE_PROJECT', payload: { id, name, description } });

    return id;
  };

  const editProject = (id, name, description) => {
    dispatch({ type: 'EDIT_PROJECT', payload: { id, name, description } });
  };

  const getColumns = (filter) => {
    if (!filter) filter = () => true;

    return state.columns.ids
      .map(id => state.columns.data[id])
      .sort((a, b) => a.ordering - b.ordering)
      .filter(filter);
  }

  const createColumn = (name, projectId) => {
    const id = uuid();
    const ordering = getColumns((column) => column.projectId === projectId).length;

    dispatch({ type: 'CREATE_COLUMN', payload: { id, name, projectId, ordering } });

    return id;
  };

  return {
    getDashboards,
    getPanels,
    getDashboardBySlug,
    getDefaultDashboard,
    getProjects,
    getProjectById,
    getProjectBySlug,
    createProject,
    editProject,
    getColumns,
    createColumn,
  };
};

export const ServicesProvider = ({ children }) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const services = createServices(state, dispatch);

  return (
    <ServicesContext.Provider
      value={services}
    >
      {children}
    </ServicesContext.Provider>
  );
};
export const useServices = () => useContext(ServicesContext);

ServicesProvider.propTypes = {
  children: oneOf([element, node])
};
