import React from 'react';

import {
  Container,
  LinearProgress,
  Box,
} from '@material-ui/core';


import styles from './EventsList.module.css';

import { useEvents } from '../useEvents';


import { Filters, FilterValue } from '../Filters/Filters';


import { ErrorScreen } from './ErrorScreen';
import { EventsSections } from './EventsSections';

const defaultFilters: FilterValue = {
  search: '',
  range: [0, 24],
  free: false,
};

export const EventsList: React.FunctionComponent<{
  type: 'ALL' | 'BOOKED';
}> = ({ type }) => {
  const [filters, setFilters] = React.useState<FilterValue>(defaultFilters);

  const {
    events,
    status,
    refetch,
    toogleBooked,
  } = useEvents(type);

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
        {events?.length !== 0 && <Filters onChange={setFilters} value={filters} />}

        <EventsSections
          events={events}
          type={type}
          filters={filters}
          onClickToogleBooked={toogleBooked}
          onClickResetFilters={() => {
            setFilters(defaultFilters);
          }}
        />
      </Box>
    </Container>
  );
};
