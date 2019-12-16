import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ModalBody, ListGroup, ListGroupItem, Col, Button, Container, Card, CardHeader, CardBody, CardText, Row, Modal, ModalHeader, Nav, NavItem, NavLink } from 'reactstrap';
import { Link, useHistory, Switch } from 'react-router-dom';
import { useStore } from 'react-redux';

import { useServices, createServices } from '../state/services';
import { reverse } from '../routing';
import { SimpleForm } from './SimpleForm';

const ProjectLayout = ({ slug, children }) => {
  const { getProjectBySlug } = useServices();

  const { name } = getProjectBySlug(slug);

  return (
    <Row>
      <Col md="2">
        <Nav vertical>
          <NavItem>
            <NavLink tag={Link} to={reverse('projects-project-view', slug)}>{name}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={reverse('projects-workboard-view', slug)}>Workboard</NavLink>
          </NavItem>
        </Nav>
      </Col>
      <Col md="10">
        <Switch>
          {children}
        </Switch>
      </Col>
    </Row>
  );
};

ProjectLayout.propTypes = {
  slug: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export const Projects = () => {
  const { getProjects } = useServices();

  const projects = getProjects().slice(0, 3);

  return (
    <Card>
      <CardHeader
        className="d-flex justify-content-between align-items-center"
      >
        <span>Projects</span>
        <Button tag={Link} to={reverse('projects-projects-view')}>
          View all
        </Button>
      </CardHeader>
      {projects.length > 0 && (
        <CardBody>
          <ListGroup flush>
            {projects.map(project => (
              <ListGroupItem
                key={project.id}
                tag={Link}
                to={reverse('projects-project-view', project.slug)}
              >
                {project.name}
              </ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>
      ) }
    </Card>
  );
};

export const CreateProject = () => {
  const store = useStore();
  const history = useHistory();
  const { createProject, getDefaultDashboard } = useServices();

  const defaultDashboard = getDefaultDashboard();

  return (
    <Card>
      <CardHeader>Create project</CardHeader>
      <CardBody>
        <Container>
          <SimpleForm
            data={{ name: '', description: '' }}
            spec={[
              {
                key: 'name',
                label: 'Name',
                type: 'text',
                validate: Boolean
              },
              {
                key: 'description',
                label: 'Description',
                type: 'textarea',
                validate: Boolean,
                props: {
                  rows: 10
                }
              }
            ]}
            onSubmit={({ name, description }) => {
              const projectId = createProject(name, description);
              const { getProjectById } = createServices(store.getState(), store.dispatch);
              const project = getProjectById(projectId);
              history.push(reverse('projects-project-view', project.slug));
            }}
            submitText="Create new project"
          >
            <Button tag={Link} to={reverse('dashboards-dashboard-view', defaultDashboard.slug)}>Cancel</Button>
          </SimpleForm>
        </Container>
      </CardBody>
    </Card>
  );
};

export const Project = ({ name, description, slug }) => {
  return (
    <ProjectLayout slug={slug}>
      <Row>
        <Col md="10">
          <Card>
            <CardHeader>
              {name}
            </CardHeader>
            <CardBody>
              <Container>
                {typeof description === 'string' ? <CardText>{description}</CardText> : description}
              </Container>
            </CardBody>
          </Card>
        </Col>
        <Col md="2">
          <Nav vertical>
            <NavLink tag={Link} to={reverse('projects-project-edit', slug)}>Edit details</NavLink>
          </Nav>
        </Col>
      </Row>
    </ProjectLayout>
  );
};

export const EditProject = ({ slug }) => {
  const store = useStore();
  const history = useHistory();
  const { editProject, getProjectBySlug } = useServices();

  const { id, name, description } = getProjectBySlug(slug);

  return (
    <Card>
      <CardHeader>Edit project</CardHeader>
      <CardBody>
        <Container>
          <SimpleForm
            data={{ name, description }}
            spec={[
              {
                key: 'name',
                label: 'Name',
                type: 'text',
                validate: Boolean
              },
              {
                key: 'description',
                label: 'Description',
                type: 'textarea',
                validate: Boolean,
                props: {
                  rows: 10
                }
              }
            ]}
            onSubmit={({ name, description }) => {
              editProject(id, name, description);
              const { getProjectById } = createServices(store.getState(), store.dispatch);
              const project = getProjectById(id);
              history.push(reverse('projects-project-view', project.slug));
            }}
            submitText="Save changes"
          >
            <Button tag={Link} to={reverse('projects-project-view', slug)}>Cancel</Button>
          </SimpleForm>
        </Container>
      </CardBody>
    </Card>
  );
};

export const Workboard = ({ slug }) => {
  const [creatingColumn, setCreatingColumn] = useState(false);
  const { createColumn, getProjectBySlug } = useServices();

  const toggleSetCreatingColumn = () => setCreatingColumn(state => !state);

  const { id, columns } = getProjectBySlug(slug);

  return (
    <ProjectLayout slug={slug}>
      <Row>
        {columns.map(column => (
          <Col md="2" key={column.id}>
            <Card>
              <CardHeader>{column.name}</CardHeader>
              <CardBody>
                <Card>
                  <CardBody>
                    <CardText>Foobar!!</CardText>
                  </CardBody>
                </Card>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal isOpen={creatingColumn} toggle={toggleSetCreatingColumn}>
        <ModalHeader toggle={toggleSetCreatingColumn}>Create column</ModalHeader>
        <ModalBody>
          <SimpleForm
            data={{ name: '' }}
            spec={[
              {
                key: 'name',
                label: 'Name',
                type: 'text',
                validate: Boolean
              },
            ]}
            onSubmit={({ name }) => {
              createColumn(name, id);
              toggleSetCreatingColumn();
            }}
            submitText="Create column"
          />
        </ModalBody>
      </Modal>
    </ProjectLayout>
  );
};

Project.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  slug: PropTypes.string.isRequired,
};

EditProject.propTypes = {
  slug: PropTypes.string.isRequired,
};

Workboard.propTypes = {
  slug: PropTypes.string.isRequired,
};
