import React from 'react';
import {
  Tabs, Tab, Container, Box,
} from '@material-ui/core';

import { useHistory } from 'react-router-dom';

import styles from './Header.module.css';

export const Header: React.FunctionComponent = () => {
  const history = useHistory();

  const handleChange = (_: any, value: string) => {
    history.push(value);
  };

  return (
    <Box className={styles.wrapper}>
      <Container
        maxWidth="md"
      >
        <Tabs
          value={history.location.pathname}
          onChange={handleChange}
        >
          <Tab label="All Events" value="/" />
          <Tab label="My Events" value="/booked" />
        </Tabs>
      </Container>
    </Box>
  );
};
