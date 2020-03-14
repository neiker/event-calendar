import React from 'react';

import { format, differenceInHours } from 'date-fns';

import {
  Paper,
  Typography,
  Grid,
  Box,
  Chip,
} from '@material-ui/core';

import { Event } from './types';

import styles from './EventRow.module.css';

import { SignUpButton } from './SignUpButton';
import { CancelButton } from './CancelButton';
import { ConfirmDialog } from './ConfirmDialog';

export const EventRow: React.FunctionComponent<{
  event: Event;
  booked: boolean;
  onClick: () => void;
}> = ({ event, booked, onClick }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Paper elevation={3} className={styles.wrapper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2} md={1}>
            <Typography variant="subtitle1">
              {format(new Date(event.startDate), 'HH:mm')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={7} md={9}>
            <Box>
              <Typography gutterBottom variant="subtitle1" display="inline">
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
                {event.city.name}
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
          <Grid item xs={12} sm={3} md={2}>
            {booked ? (
              <CancelButton onClick={handleOpen} />
            ) : (
              <SignUpButton onClick={handleOpen} />
            )}
          </Grid>
        </Grid>
      </Paper>

      <ConfirmDialog
        open={open}
        booked={booked}
        onPressClose={handleClose}
        onPressConfirm={() => {
          handleClose();
          onClick();
        }}
        event={event}
      />
    </>
  );
};
