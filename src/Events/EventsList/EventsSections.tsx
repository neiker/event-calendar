import React from 'react';

import {
  Typography, Box, Button,
} from '@material-ui/core';

import { Link } from 'react-router-dom';

import { getSections } from './helpers';

import styles from './EventsList.module.css';

import { EventsSectionBox } from './EventsSectionBox';
import { FilterValue } from '../Filters/Filters';
import { EventsSection, Event } from '../types';

export const EventsSections: React.FunctionComponent<{
  events: Event[] | null;
  type: 'ALL' | 'BOOKED';
  filters: FilterValue;
  onClickToogleBooked: (event: Event) => void;
  onClickResetFilters: () => void;
}> = ({
  events,
  type,
  filters,
  onClickToogleBooked,
  onClickResetFilters,
}) => {
  const sections: EventsSection[] | null = React.useMemo(() => (
    events ? getSections(events, filters) : null
  ), [events, filters]);

  if (!events || events.length === 0) {
    return (
      <Box className={styles.empty}>
        <Typography variant="h5" align="center">
          {type === 'BOOKED' ? 'You don\'t have booked events' : 'There\'s no events yet.'}
        </Typography>
        {type === 'BOOKED' && (
        <Button component={Link} to="/" color="primary">Book one</Button>
        )}
      </Box>
    );
  }

  if (!sections || sections.length === 0) {
    return (
      <Box className={styles.empty}>
        <Typography variant="h5" align="center">
          No results for this filters.
        </Typography>
        <Button
          onClick={onClickResetFilters}
          color="primary"
        >
          Clean filters
        </Button>
      </Box>
    );
  }

  return (
    <>
      {sections?.map((section) => (
        <EventsSectionBox
          key={section.key}
          section={section}
          onClickToogleBooked={onClickToogleBooked}
        />
      ))}
    </>
  );
};
