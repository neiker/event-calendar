import { useQuery } from 'react-query';
import { format } from 'date-fns';

import { EventsSection, RawEvent, City } from './EventsList';

async function resolver(url: string) {
    const response = await fetch(url);
    
    
    if (!response.ok) {
        throw new Error(response.statusText)
    }

    return response.json();
  }

  
async function queryFn(): Promise<EventsSection[]> {
  const [rawEvents, cities] = (await Promise.all([
    resolver('https://api.jsonbin.io/b/5e6be60fdf26b84aac0eb316'),
    resolver('https://api.jsonbin.io/b/5e6be5d707f1954acedf7f20'),
  ])) as [RawEvent[], City[]];

  return rawEvents.reduce((acc: EventsSection[], rawEvent: RawEvent) => {
    const city = cities.find(i => i.id === rawEvent.city);

    if (!city) {
      throw new Error('Invalid city id');
    }

    const event = {
      ...rawEvent,
      city,
    };

    const date = format(new Date(rawEvent.startDate), 'EEEE io LLLL');

    const section = acc.find(i => i.key === date);

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

export function useEvents(): {
  data: EventsSection[] | null;
  error: Error | null;
  status: 'loading' | 'success' | 'error';
  refetch: () => void;
} {
  // see: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/42705
  // @ts-ignore 
  const { data, error, refetch, status } = useQuery<EventsSection[], {}>('events', queryFn);

  console.log(status);

  return {
    data,
    error,
    status,
    refetch,
  };
}