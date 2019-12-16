import React from 'react';
import PropTypes from 'prop-types';

import { Panel } from './Panel';
import { StandardLayout } from './StandardLayout';

export const Dashboard = ({ panels }) => {
  return (
    <StandardLayout>
      {panels.map(panel => (
        <Panel
          key={panel.id}
          name={panel.name}
          type={panel.type}
          data={panel.data}
        />
      ))}
    </StandardLayout>
  );
};

Dashboard.propTypes = {
  panels: PropTypes.array.isRequired,
};
