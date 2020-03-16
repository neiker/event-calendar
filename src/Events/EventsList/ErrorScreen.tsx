import React from 'react';
import {
  Container, Typography, Box, Button,
} from '@material-ui/core';
import styles from './EventsList.module.css';

export const ErrorScreen: React.FunctionComponent<{
  onClickRetry: () => void;
}> = ({ onClickRetry }) => (
  // TODO Not all errors should display the refetch button.
  <Container maxWidth="md" className={styles.container}>
    <Box className={styles.empty}>
      <Typography variant="h5" align="center">
        An error occurred.
      </Typography>
      <Button onClick={onClickRetry} color="primary">
        Try again
      </Button>
    </Box>
  </Container>
);
