import React from 'react';

import {
  Container, LinearProgress, Typography, Box, Button,
} from '@material-ui/core';

import { Link } from 'react-router-dom';

import { getSections } from './helpers';

import styles from './EventsList.module.css';

import { useEvents } from '../useEvents';


import { EventsSectionBox } from './EventsSectionBox';
import { Filters, FilterValue } from '../Filters/Filters';
import { EventsSection, Event } from '../types';

import { ErrorScreen } from './ErrorScreen';

const defaultFilters: FilterValue = {
  search: '',
  range: [0, 24],
  free: false,
};


const Sections: React.FunctionComponent<{
  sections: EventsSection[];
  type: 'ALL' | 'BOOKED';
  setFilters: (filters: FilterValue) => void
  toogleBooked: (event: Event) => void
}> = ({
  sections, type, setFilters, toogleBooked,
}) => {
  if (sections.length === 0) {
    return (
      <Box className={styles.empty}>
        <Typography variant="h5" align="center">
          {type === 'BOOKED' ? 'You don\'t have booked events' : 'No results for this filters.'}
        </Typography>
        {type === 'BOOKED' ? (
          <Button component={Link} to="/" color="primary">Book one</Button>
        ) : (
          <Button
            onClick={() => {
              setFilters(defaultFilters);
            }}
            color="primary"
          >
            Clean filters
          </Button>
        )}
      </Box>
    );
  }

  return (
    <>
      {sections?.map((section) => (
        <EventsSectionBox
          key={section.key}
          section={section}
          onClickToogleEvent={toogleBooked}
        />
      ))}
    </>
  );
};

export const EventsList: React.FunctionComponent<{
  type: 'ALL' | 'BOOKED';
}> = ({ type }) => {
  const [filters, setFilters] = React.useState<FilterValue>(defaultFilters);

  const {
    events, status, refetch, toogleBooked,
  } = useEvents(type);

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

        <Sections
          toogleBooked={toogleBooked}
          sections={sections}
          type={type}
          setFilters={setFilters}
        />
      </Box>
    </Container>
  );
};
