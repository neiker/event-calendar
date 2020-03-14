import React from 'react';
import {
  Tabs, Tab,
} from '@material-ui/core';

import { useHistory } from 'react-router-dom';


export const NavBar: React.FunctionComponent = () => {
  const history = useHistory();

  const handleChange = (event: React.ChangeEvent<{}>, value: string) => {
    history.push(value);
  };

  return (
    <Tabs
      value={history.location.pathname}
      onChange={handleChange}
    >
      <Tab label="All Events" value="/" />
      <Tab label="My Events" value="/booked" />
    </Tabs>
  );
};
