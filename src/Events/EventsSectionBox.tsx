import React from 'react';
import {
  Typography, Box, Paper, Divider,
} from '@material-ui/core';
import { EventRow } from './EventRow';
import styles from './EventsSectionBox.module.css';
import { Event, EventsSection } from './types';

export const EventsSectionBox: React.FunctionComponent<{
  section: EventsSection;
  onClickEvent: (event: Event) => void;
  bookedEventsIds: number[];
  type: 'ALL' | 'BOOKED';
}> = ({
  section: { key, events }, onClickEvent, bookedEventsIds, type,
}) => {
  const filteredEvents = type === 'BOOKED'
    ? events.filter((e) => bookedEventsIds.includes(e.id))
    : events;
  if (!filteredEvents.length) {
    return null;
  }
  return (
    <Box key={key} className={styles.container}>
      <Typography gutterBottom>{key}</Typography>

      <Paper elevation={2} className={styles['section-wrapper']}>
        {filteredEvents.map((event, index) => {
          const booked = bookedEventsIds.includes(event.id);
          if (type === 'BOOKED' && !booked) {
            return null;
          }
          return (
            <>
              {index !== 0 && <Divider className={styles.divider} />}
              <EventRow
                key={event.id}
                event={event}
                booked={booked}
                onClick={() => {
                  onClickEvent(event);
                }}
              />
            </>
          );
        })}
      </Paper>
    </Box>
  );
};
