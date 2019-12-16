import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Nav, NavItem, NavLink as Link } from 'reactstrap';
import { NavLink as RouterLink } from 'react-router-dom';

import { useServices } from '../state/services';

import { reverse } from '../routing';

const NavLink = (props) => <Link tag={RouterLink} {...props} />

export const StandardLayout = ({ children }) => {
  const { getDashboards } = useServices();

  const dashboards = getDashboards();

  return (
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
        {children}
      </Col>
    </Row>
  );
};

StandardLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
