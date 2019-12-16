import React from 'react';

import { Switch, Route, Redirect } from 'react-router';
import Markdown from 'react-markdown';

import { Dashboard } from './components/Dashboard';
import { useServices } from './state/services';

import { reverse } from './routing';
import { CreateProject, Project, EditProject, Projects, Workboard } from './components/Project';
import { Navbar, NavbarBrand, Container } from 'reactstrap';
import { Link } from 'react-router-dom';

function App() {
  const { getDashboardBySlug, getDefaultDashboard, getProjectBySlug } = useServices();

  const defaultDashboard = getDefaultDashboard();

  return (
    <>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={Link} to="/">{process.env.REACT_APP_NAME}</NavbarBrand>
      </Navbar>
      <Container fluid className="py-3">
        <Switch>
          <Route
            exact
            path="/"
            component={() => <Redirect to={reverse('dashboards-dashboard-view', defaultDashboard.slug)} />}
          />
          <Route
            exact
            path={reverse('dashboards-dashboard-view', ':slug')}
            component={({ match: { params: { slug } } }) => {
              const { panels } = getDashboardBySlug(slug);

              return <Dashboard panels={panels} />;
            }}
          />
          <Route
            exact
            path={reverse('projects-projects-view')}
            component={Projects}
          />
          <Route
            exact
            path={reverse('projects-project-create')}
            component={CreateProject}
          />
          <Route
            exact
            path={reverse('projects-project-view', ':slug')}
            component={({ match: { params: { slug } } }) => {
              const { id, name, description, columns } = getProjectBySlug(slug);

              return (
                <Project
                  id={id}
                  name={name}
                  description={<Markdown source={description} />}
                  slug={slug}
                  columns={columns}
                />
              );
            }}
          />
          <Route
            exact
            path={reverse('projects-project-edit', ':slug')}
            component={({ match: { params: { slug } } }) => {
              return (
                <EditProject
                  slug={slug}
                />
              );
            }}
          />
          <Route
            exact
            path={reverse('projects-workboard-view', ':slug')}
            component={({ match: { params: { slug } } }) => <Workboard slug={slug} />}
          />
        </Switch>
      </Container>
    </>
  );
}

export default App;
