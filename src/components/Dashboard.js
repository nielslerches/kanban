import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from './Panel';

export const Dashboard = ({ panels }) => {
  return (
    <>
      {panels.map(panel => (
        <Panel
          key={panel.id}
          name={panel.name}
          type={panel.type}
          data={panel.data}
        />
      ))}
    </>
  );
};

Dashboard.propTypes = {
  panels: PropTypes.array.isRequired,
};
