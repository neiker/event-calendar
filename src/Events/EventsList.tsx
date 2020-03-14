import React from 'react';

import {
  Container, LinearProgress, Typography, Box, Button,
} from '@material-ui/core';


import styles from './EventsList.module.css';
import { useEvents } from './useEvents';

import { EventsSectionBox } from './EventsSectionBox';

function useBooks(): [number[], (id: number) => void] {
  const [bookedEventsIds, setBookedEventsIds] = React.useState<number[]>([]);

  React.useEffect(() => {
    try {
      const idsString = localStorage.getItem('ids');

      if (idsString) {
        setBookedEventsIds(JSON.parse(idsString));
      }
    } catch (e) {
      // do nothing
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('ids', JSON.stringify(bookedEventsIds));
  }, [bookedEventsIds]);

  const toggle = React.useCallback((id: number) => {
    setBookedEventsIds((currentIds) => {
      const index = currentIds.indexOf(id);

      if (index === -1) {
        return [...currentIds, id];
      }

      return currentIds.filter((i) => i !== id);
    });
  }, []);

  return [bookedEventsIds, toggle];
}


export const EventsList: React.FunctionComponent<{
  type: 'ALL' | 'BOOKED';
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
    return <LinearProgress variant="query" color="primary" />;
  }

  if (bookedEventsIds.length === 0 && type === 'BOOKED') {
    return (
      <Container maxWidth="md">
        <Box className={styles.empty}>
          <Typography variant="h5" align="center">
            You don&apos;t have booked events
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      {data?.map((section) => (
        <EventsSectionBox
          key={section.key}
          section={section}
          bookedEventsIds={bookedEventsIds}
          type={type}
          onClickEvent={(event) => {
            toggle(event.id);
          }}
        />
      ))}
    </Container>
  );
};
