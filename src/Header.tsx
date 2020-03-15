import React from 'react';
import {
  Tabs, Tab,
} from '@material-ui/core';

import { useHistory } from 'react-router-dom';

export const Header: React.FunctionComponent = () => {
  const history = useHistory();

  const handleChange = (_: any, value: string) => {
    history.push(value);
  };

  return (
    <Tabs
      value={history.location.pathname}
      onChange={handleChange}
      style={{
        // TODO move to css module
        position: 'fixed',
        top: 0,
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.9)',
      }}
    >
      <Tab label="All Events" value="/" />
      <Tab label="My Events" value="/booked" />
    </Tabs>
  );
};
