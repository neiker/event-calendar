import React from 'react';
import {
  Button, ButtonGroup, Grid, Typography, Container,
} from '@material-ui/core';

import { Link } from 'react-router-dom';

import styles from './NavBar.module.css';

export const NavBar: React.FunctionComponent = () => (
  <div className={styles.navbar}>
    <Container>
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <Typography>Events</Typography>
        </Grid>
        <Grid item xs={10}>
          <ButtonGroup variant="text" color="primary">
            <Button>
              <Link to="/">All Events</Link>
            </Button>
            <Button>
              <Link to="/booked">My Events</Link>
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Container>
  </div>
);
