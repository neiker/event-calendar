import React from 'react';

import {
  Container, LinearProgress, Typography, Box, Button,
} from '@material-ui/core';


import { Link } from 'react-router-dom';
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
  const { data, status, refetch } = useEvents(type);


  if (status === 'error') {
    // TODO Not all errors should display the refetch button.

    return (
      <Container maxWidth="md" className={styles.container}>
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
    return (
      <Box className={styles.container}>
        <LinearProgress variant="query" color="primary" />
      </Box>
    );
  }

  if (bookedEventsIds.length === 0 && type === 'BOOKED') {
    return (
      <Container maxWidth="md" className={styles.container}>
        <Box className={styles.empty}>
          <Typography variant="h5" align="center">
            You don&apos;t have booked events
          </Typography>
          <Button component={Link} to="/" color="primary">Book one</Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="md"
      className={styles.container}
    >
      <Box className={styles.content}>
        {type === 'BOOKED' && <Typography variant="h5">My next tech events</Typography>}

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
      </Box>
    </Container>
  );
};
