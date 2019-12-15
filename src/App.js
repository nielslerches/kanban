import React from 'react';

import { Container, Row, Col, Nav, NavItem, NavLink as Link } from 'reactstrap';
import { Switch, Route, Redirect } from 'react-router';
import { NavLink as RouterLink } from 'react-router-dom';
import Markdown from 'react-markdown';

import { Dashboard } from './components/Dashboard';
import { useServices } from './state/services';

import { reverse } from './routing';
import { ProjectsView, CreateProject, Project, EditProject } from './components/Project';

const NavLink = (props) => <Link tag={RouterLink} {...props} />

function App() {
  const { getDashboards, getDashboardBySlug, getDefaultDashboard, getProjectBySlug } = useServices();

  const defaultDashboard = getDefaultDashboard();
  const dashboards = getDashboards();
  return (
    <Container fluid className="my-3">
      <Row>
        <Col md="2">
          <Nav vertical>
            {dashboards.map(dashboard => (
              <NavItem key={dashboard.id}>
                <NavLink to={reverse('dashboards-dashboard-view', dashboard.slug)}>{dashboard.name}</NavLink>
              </NavItem>
            ))}
          </Nav>
          <hr />
          <Nav vertical>
            <NavItem>
              <NavLink to={reverse('projects-projects-view')}>Projects</NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col md="10">
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
              component={ProjectsView}
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
                const { name, description } = getProjectBySlug(slug);

                return (
                  <Project
                    name={name}
                    description={<Markdown source={description} />}
                    slug={slug}
                  />
                );
              }}
            />
            <Route
              exact
              path={reverse('projects-project-edit', ':slug')}
              component={({ match: { params: { slug } } }) => {
                const { id, name, description } = getProjectBySlug(slug);

                return (
                  <EditProject
                    id={id}
                    name={name}
                    description={description}
                  />
                );
              }}
            />
          </Switch>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
