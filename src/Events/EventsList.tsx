import React from 'react';

import { Container, LinearProgress, Typography, Box, Button } from '@material-ui/core';

import { EventRow } from './EventRow';

import styles from './EventsList.module.css';
import { useEvents } from './useEvents';

export interface RawEvent {
  city: number;
  endDate: string;
  id: number;
  isFree: boolean;
  name: string;
  startDate: string;
}

export interface Event extends Omit<RawEvent, 'city'> {
  city: City;  
}

export interface City {
  id: number;
  name: string;
}

export type Type = 'ALL' | 'BOOKED';

function useBooks(): [number[], (id: number) => void] {
  const [bookedEventsIds, setBookedEventsIds] = React.useState<number[]>([]);

  React.useEffect(() => {
    try {
      const idsString = localStorage.getItem('ids');

      if (idsString) {
        setBookedEventsIds(JSON.parse(idsString));
      }
    } catch (e) {}
  }, []);

  React.useEffect(() => {
    localStorage.setItem('ids', JSON.stringify(bookedEventsIds));
  }, [bookedEventsIds]);

  const toggle = React.useCallback((id: number) => {
    setBookedEventsIds(currentIds => {
      const index = currentIds.indexOf(id);

      if (index === -1) {
        return [...currentIds, id];
      }

      return currentIds.filter(i => i !== id);
    });
  }, []);

  return [bookedEventsIds, toggle];
}

export type EventsSection = {
  key: string;
  events: Event[];
};

export const EventsSection: React.FunctionComponent<{
  section: EventsSection;
  onClickEvent: (event: Event) => void;
  bookedEventsIds: number[];
  type: Type;
}> = ({ section: { key, events }, onClickEvent, bookedEventsIds, type }) => {
  const filteredEvents =
    type === 'BOOKED'
      ? events.filter(e => bookedEventsIds.includes(e.id))
      : events;

  if (!filteredEvents.length) {
    return null;
  }

  return (
    <Box key={key} style={{ marginTop: 20 }}>
      <Typography>{key}</Typography>

      {filteredEvents.map(event => {
        const booked = bookedEventsIds.includes(event.id);

        if (type === 'BOOKED' && !booked) {
          return null;
        }

        return (
          <EventRow
            key={event.id}
            event={event}
            booked={booked}
            onClick={() => {
              onClickEvent(event);
            }}
          />
        );
      })}
    </Box>
  );
};

export const EventsList: React.FunctionComponent<{
  type: Type;
}> = ({ type }) => {
  const [bookedEventsIds, toggle] = useBooks();
  const { data, status, refetch } = useEvents();

  
  if (status === 'error') {
    // TODO Not all errors should display the refetch button.

    return (
      <Container maxWidth="md">
        <Box className={styles.empty}>
          <Typography variant="h5" align="center">
            An error occurred.
          </Typography>
          <Button onClick={refetch} color="primary">
            Try again
          </Button>
        </Box>
      </Container>
    );
  }

  if (status === 'loading') {
    return <LinearProgress variant="query" color="secondary" />;
  }

  if (bookedEventsIds.length === 0 && type === 'BOOKED') {
    return (
      <Container maxWidth="md">
        <Box className={styles.empty}>
          <Typography variant="h5" align="center">
            You don't have booked events
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      {data?.map(section => (
        <EventsSection
          key={section.key}
          section={section}
          bookedEventsIds={bookedEventsIds}
          type={type}
          onClickEvent={event => {
            toggle(event.id);
          }}
        />
      ))}
    </Container>
  );
};
