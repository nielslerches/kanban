import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import { ListGroup, ListGroupItem, FormGroup, Col, Input, Form, Label, Button, Container, Card, CardHeader, CardBody, CardText } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';

import { useServices, createServices } from '../state/services';
import { reverse } from '../routing';
import { useStore } from 'react-redux';

export const Projects = () => {
  const { getProjects } = useServices();

  const projects = getProjects();

  return (
    <Card>
      <CardHeader>
        Projects
      </CardHeader>
      {projects.length > 0 && (
        <CardBody className="pb-0">
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
      <CardBody className="text-center">
        <Button tag={Link} to={reverse('projects-project-create')}>
          + Create project
        </Button>
      </CardBody>
    </Card>
  );
}

export const ProjectsView = () => <Projects />;

const SimpleForm = ({ data, spec, onSubmit, submitText, children }) => {
  const [state, dispatch] = useReducer((_state, { key, value }) => ({ ..._state, [key]: value }), data);

  const validators = {};
  for (const { key, validate } of spec.filter(({ validate }) => validate)) {
    validators[key] = validate;
  }

  const validate = (state) => {
    for (const key in validators) {
      const validator = validators[key];
      const value = state[key];

      if (!validator(value)) {
        return false;
      }
    }

    return true;
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (validate(state)) {
          onSubmit(state);
        }
      }}
    >
      {spec.map(({ key, label, type, props }) => (
        <FormGroup key={key} row>
          <Label for={key} sm={2} className="text-right">{label}</Label>
          <Col sm={10}>
            <Input
              type={type}
              id={key}
              name={key}
              value={state[key]}
              onChange={e => dispatch({ key, value: e.target.value })}
              placeholder={data[key] || label}
              {...(props || {})}
            />
          </Col>
        </FormGroup>
      ))}
      <FormGroup className="text-right">
        <Button disabled={!validate(state)} color="primary">{submitText}</Button>
      </FormGroup>
      {children}
    </Form>
  );
}

export const CreateProject = () => {
  const store = useStore();
  const history = useHistory();
  const { createProject } = useServices();

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
          />
        </Container>
      </CardBody>
    </Card>
  );
};

export const Project = ({ name, description, slug }) => {
  return (
    <Card>
      <CardHeader className="d-flex position-relative">
        {name}
        <Button
          outline
          color="secondary"
          className="position-absolute"
          style={{ marginTop: -7, right: 0, marginRight: 5 }}
          tag={Link}
          to={reverse('projects-project-edit', slug)}
        >Edit project</Button>
      </CardHeader>
      <CardBody>
        <Container>
          {typeof description === 'string' ? <CardText>{description}</CardText> : description}
        </Container>
      </CardBody>
    </Card>
  );
};

export const EditProject = ({ id, name, description }) => {
  const store = useStore();
  const history = useHistory();
  const { editProject } = useServices();

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
          />
        </Container>
      </CardBody>
    </Card>
  );
};

Project.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  slug: PropTypes.string.isRequired,
};

EditProject.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
