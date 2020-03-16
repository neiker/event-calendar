import React from 'react';
import {
  Typography, Box, Paper, Divider,
} from '@material-ui/core';
import { EventRow } from './EventRow/EventRow';
import styles from './EventsSectionBox.module.css';
import { Event, EventsSection } from '../types';


export const EventsSectionBox: React.FunctionComponent<{
  section: EventsSection;
  onClickToogleEvent: (event: Event) => void;
}> = ({
  section: { key, events },
  onClickToogleEvent,

}) => {
  if (!events.length) {
    return null;
  }

  return (
    <Box className={styles.container}>
      <Typography variant="subtitle2" gutterBottom>{key}</Typography>

      <Paper elevation={2} className={styles['section-wrapper']}>
        {events.map((event, index) => (
          <React.Fragment key={event.id}>
            {index !== 0 && <Divider className={styles.divider} />}
            <EventRow
              event={event}
              onClickToogle={() => {
                onClickToogleEvent(event);
              }}
            />
          </React.Fragment>
        ))}
      </Paper>
    </Box>
  );
};
