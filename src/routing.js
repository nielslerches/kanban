const views = {
  'dashboards-dashboard-view': (slug) => `/dashboards/dashboard/view/${slug}`,
  'projects-project-view': (slug) => `/projects/project/view/${slug}`,
  'projects-projects-view': '/projects/projects/view',
  'projects-project-create': '/projects/project/create',
  'projects-project-edit': (slug) => `/projects/project/edit/${slug}`,
};

export const reverse = (name, ...args) => {
  const value = views[name];
  if (!value) {
    throw new Error(`unknown view with name ${name}`);
  }

  if (typeof value === 'function') {
    return value(...args);
  }

  return value;
};
