import React from 'react';
import { Typography, Box, Button } from '@material-ui/core';
import styles from './EventsList.module.css';

export const NoResults: React.FunctionComponent<{
  onClickClear: () => void;
}> = ({ onClickClear }) => (
  <Box className={styles.empty}>
    <Typography variant="h5" align="center">
      No results for this filters.
    </Typography>
    <Button onClick={onClickClear} color="primary">
      Clean filters
    </Button>
  </Box>
);
