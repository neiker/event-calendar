import React from 'react';
import { useQuery } from 'react-query';

import { Container, LinearProgress, Typography, Box } from '@material-ui/core';

import { format } from 'date-fns';
import { resolver } from '../resolver';
import { EventRow } from './EventRow';

export interface Event {
  city: number;
  endDate: string;
  id: number;
  isFree: boolean;
  name: string;
  startDate: string;
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

type EventsSection = {
  key: string;
  events: Event[];
};

const EventsSection: React.FunctionComponent<{
    section: EventsSection,
    onClickEvent: (event: Event) => void,
    bookedEventsIds: number[],
    type: Type,
}> = ({ 
    section: { key, events}, 
    onClickEvent,
    bookedEventsIds,
    type,
}) => {
    const filteredEvents = type === 'BOOKED' ? events.filter(e => bookedEventsIds.includes(e.id)): events;

    if (!filteredEvents.length) {
        return null
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
    )
}

export const EventsList: React.FunctionComponent<{
  type: Type;
}> = ({ type }) => {
  const { data } = useQuery<EventsSection[], {}>('events', () =>
    resolver('https://api.jsonbin.io/b/5e6be60fdf26b84aac0eb316').then(items =>
      items.reduce((acc: EventsSection[], item: Event) => {
        const date = format(new Date(item.startDate), 'EEEE io LLLL');

        const section = acc.find(i => i.key === date);

        if (section) {
          section.events.push(item);

          return acc;
        }

        return [
          ...acc,
          {
            key: date,
            events: [item],
          },
        ];
      }, []),
    ),
  );

  const [bookedEventsIds, toggle] = useBooks();

  if (data === undefined) {
    return <LinearProgress variant="query" color="secondary" />;
  }

  if (bookedEventsIds.length === 0 && type === 'BOOKED') {
    return (
      <Container maxWidth="md">
        <Typography variant="h4" align="center">
          You don't have booked events
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      {data?.map((section) => (
          <EventsSection 
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
