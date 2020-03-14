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
  const filteredEvents = React.useMemo(() => (
    type === 'ALL'
      ? events
      : events.filter((e) => bookedEventsIds.includes(e.id))
  ), [bookedEventsIds, events, type]);

  if (!filteredEvents.length) {
    return null;
  }

  return (
    <Box className={styles.container}>
      <Typography variant="subtitle2" gutterBottom>{key}</Typography>

      <Paper elevation={2} className={styles['section-wrapper']}>
        {filteredEvents.map((event, index) => {
          const booked = bookedEventsIds.includes(event.id);
          if (type === 'BOOKED' && !booked) {
            return null;
          }
          return (
            <React.Fragment key={event.id}>
              {index !== 0 && <Divider className={styles.divider} />}
              <EventRow
                event={event}
                booked={booked}
                onClick={() => {
                  onClickEvent(event);
                }}
              />
            </React.Fragment>
          );
        })}
      </Paper>
    </Box>
  );
};
