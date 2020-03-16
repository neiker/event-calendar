import { useQuery } from 'react-query';


import React from 'react';
import {
  RawEvent,
  City,
  Event,
} from './types';
import { useBookings } from './useBookings';

// We don't use fetch() because is not supported by cypress
// see: https://github.com/cypress-io/cypress/issues/95
function resolver(url: string) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(new Error());
      }
    };

    xhr.open('GET', url);

    xhr.send();
  });
}


async function queryFn(): Promise<Event[]> {
  const [rawEvents, cities] = (await Promise.all([
    resolver('https://api.jsonbin.io/b/5e6be60fdf26b84aac0eb316'),
    resolver('https://api.jsonbin.io/b/5e6be5d707f1954acedf7f20'),
  ])) as [RawEvent[], City[]];


  return rawEvents.map((rawEvent) => {
    const city = cities.find((i) => i.id === rawEvent.city);

    if (!city) {
      throw new Error('Invalid city id');
    }

    return {
      ...rawEvent,
      booked: false,
      city,
    };
  });
}


export function useEvents(type: 'ALL' | 'BOOKED'): {
  events: Event[] | null;
  error: Error | null;
  status: 'loading' | 'success' | 'error';
  refetch: () => void;
  toogleBooked: (event: Event) => void;
} {
  const [bookedEventsIds, toogleBooked] = useBookings();
  const {
    data,
    error,
    refetch,
    // see: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/42705
    // @ts-ignore
    status,
  } = useQuery<Event[], {}>('events', queryFn);

  const events = React.useMemo(() => data?.reduce((acc: Event[], event: Event) => {
    const booked = bookedEventsIds.includes(event.id);

    if (type === 'BOOKED' && !booked) {
      return acc;
    }

    return [
      ...acc,
      {
        ...event,
        booked,
      },
    ];
  }, []), [bookedEventsIds, data, type]);

  return {
    events: events || null,
    error,
    status,
    refetch,
    toogleBooked,
  };
}
