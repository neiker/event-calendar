import React from 'react';

import { format, differenceInHours } from 'date-fns';

import {

  Typography,
  Grid,
  Box,
  Chip,
} from '@material-ui/core';

import { Event } from '../../types';


import { SignUpButton } from './SignUpButton';
import { CancelButton } from './CancelButton';
import { ConfirmDialog } from './ConfirmDialog';

export const EventRow: React.FunctionComponent<{
  event: Event;
  onClick: () => void;
}> = ({ event, onClick }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container spacing={2} className="cypress-event-container">
        <Grid item xs={12} sm={1} md={1}>
          <Typography variant="subtitle1">
            {format(new Date(event.startDate), 'HH:mm')}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Box>
            <Typography gutterBottom variant="subtitle1" display="inline">
              {event.name}
            </Typography>
            {event.isFree && (
              <Chip
                size="small"
                label="Free"
                style={{ marginLeft: 5 }}
                color="secondary"
                variant="outlined"
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
          {event.booked ? (
            <CancelButton onClick={handleOpen} />
          ) : (
            <SignUpButton onClick={handleOpen} />
          )}
        </Grid>
      </Grid>


      {open && (
        <ConfirmDialog
          open
          onPressClose={handleClose}
          onPressConfirm={() => {
            handleClose();
            onClick();
          }}
          event={event}
        />
      )}
    </>
  );
};
