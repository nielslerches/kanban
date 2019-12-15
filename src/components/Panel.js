import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText, CardBody } from 'reactstrap';
import { Projects } from './Project';

const SimplePanel = ({ name, children }) => (
  <Card>
    <CardHeader>{name}</CardHeader>
    <CardBody>{children}</CardBody>
  </Card>
);

const TextPanel = ({ name, data }) => <SimplePanel name={name}>{data}</SimplePanel>;

const TYPE_TO_RENDERER = {
  text: TextPanel,
  projects: Projects,
};

export const Panel = ({ name, type, data }) => {
  const InternalPanel = TYPE_TO_RENDERER[type];

  return <InternalPanel name={name} data={data} />
};

Panel.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired,
};

TextPanel.propTypes = {
  data: PropTypes.string.isRequired,
};
