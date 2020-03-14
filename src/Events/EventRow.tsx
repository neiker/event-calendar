import React from 'react';
import { useQuery } from 'react-query';
import { format, differenceInHours } from 'date-fns';

import { Paper, Typography, Grid, Box, Chip } from '@material-ui/core';

import { resolver } from '../resolver';
import { Event, City } from './EventsList';

import styles from './EventRow.module.css';
import { SignUpButton } from './SignUpButton';
import { CancelButton } from './CancelButton';

export const EventRow: React.FunctionComponent<{
  event: Event;
  booked: boolean;
  onClick: () => void;
}> = ({ event, booked, onClick }) => {
  const cities = useQuery<City[], any>('cities', () =>
    resolver('https://api.jsonbin.io/b/5e6be5d707f1954acedf7f20'),
  );

  return (
    <Paper elevation={3} className={styles.wrapper}>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <Typography variant="subtitle1">
            {format(new Date(event.startDate), 'HH:mm')}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Box>
            <Typography
              gutterBottom
              noWrap
              variant="subtitle1"
              display="inline"
            >
              {event.name}
            </Typography>
            {event.isFree && (
              <Chip
                size="small"
                label="Free"
                style={{ marginLeft: 5 }}
                color="primary"
              />
            )}
          </Box>
          <Box>
            <Typography display="inline" variant="subtitle2">
              {cities.data?.find(l => l.id === event.city)?.name}
            </Typography>

            <Typography
              display="inline"
              variant="subtitle2"
              color="textSecondary"
            >
              {' - '}
              {differenceInHours(
                new Date(event.endDate),
                new Date(event.startDate),
              )}
              hr
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          {booked ? (
            <CancelButton onClick={onClick} />
          ) : (
            <SignUpButton onClick={onClick} />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};
