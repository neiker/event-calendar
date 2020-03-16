import React from 'react';

import {
  Container, LinearProgress, Typography, Box, Button,
} from '@material-ui/core';


import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import styles from './EventsList.module.css';
import { useEvents } from '../useEvents';

import { EventsSectionBox } from './EventsSectionBox';
import { Filters, FilterValue } from '../Filters/Filters';
import { Event, EventsSection } from '../types';
import { NoResults } from './NoResults';
import { ErrorScreen } from './ErrorScreen';
import { useBookings } from '../useBookings';

function filterEvent(filters: FilterValue, event: Event): boolean {
  if (filters.search) {
    const regex = new RegExp(filters.search, 'i');
    if (!(regex.test(event.name) || regex.test(event.city.name))) {
      return false;
    }
  }

  if (filters.free && !event.isFree) {
    return false;
  }

  if (filters.range[0] !== 0 || filters.range[1] !== 24) {
    const start = new Date(event.startDate).getHours();

    if (start < filters.range[0]) {
      return false;
    }

    const end = new Date(event.endDate).getHours() || 24;


    if (end > filters.range[1]) {
      return false;
    }
  }

  return true;
}

function getSections(events: Event[], filters?: FilterValue): EventsSection[] {
  return events.reduce((acc: EventsSection[], event: Event) => {
    const date = format(new Date(event.startDate), 'EEEE io LLLL');

    const section = acc.find((i) => i.key === date);

    if (filters && !filterEvent(filters, event)) {
      return acc;
    }

    if (section) {
      section.events.push(event);

      return acc;
    }

    return [
      ...acc,
      {
        key: date,
        events: [event],
      },
    ];
  }, []);
}

export const EventsList: React.FunctionComponent<{
  type: 'ALL' | 'BOOKED';
}> = ({ type }) => {
  const [filters, setFilters] = React.useState<FilterValue>({
    search: '',
    range: [0, 24],
    free: false,
  });

  const [bookedEventsIds, toggle] = useBookings();
  const { events, status, refetch } = useEvents(bookedEventsIds, type);

  const sections: EventsSection[] = React.useMemo(() => (
    events ? getSections(events, filters) : []
  ), [events, filters]);

  if (status === 'error') {
    return (
      <ErrorScreen onClickRetry={refetch} />
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
        {type === 'BOOKED' ? (
          <Typography variant="h5">My next tech events</Typography>
        ) : (
          <Filters onChange={setFilters} value={filters} />
        )}

        {events?.length && !sections.length ? (
          <NoResults onClickClear={() => {
            setFilters({
              search: '',
              range: [0, 24],
              free: false,
            });
          }}
          />
        ) : sections?.map((section) => (
          <EventsSectionBox
            key={section.key}
            section={section}
            onClickEvent={(event) => {
              toggle(event.id);
            }}
          />
        ))}
      </Box>
    </Container>
  );
};
