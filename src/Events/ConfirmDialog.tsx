import React from 'react';
import { format } from 'date-fns';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';

import { Event } from './types';

export const ConfirmDialog: React.FunctionComponent<{
  open: boolean;
  booked: boolean;
  onPressClose: () => void;
  onPressConfirm: () => void;
  event: Event;
}> = ({
  open, booked, onPressClose, onPressConfirm, event,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onPressClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {booked ? 'Leave the event' : 'Join the event'}
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You are about to
          {' '}
          {booked ? <strong>cancel </strong> : ''}
              sign up for
          {' '}
          <strong>{event.name}</strong>
              . This event take place the
          {' '}
          <strong>{format(new Date(event.startDate), 'EEEE io LLLL')}</strong>
          {' '}
              in
          {' '}
          <strong>{event.city.name}</strong>
          .
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
              Are you sure?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onPressClose}>No</Button>
        <Button autoFocus onClick={onPressConfirm} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
