import React from 'react';
import { Event } from './types';

export function useBookings(): [number[], (event: Event) => void] {
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

  const toggle = React.useCallback((event: Event) => {
    setBookedEventsIds((currentIds) => {
      const index = currentIds.indexOf(event.id);
      if (index === -1) {
        return [...currentIds, event.id];
      }
      return currentIds.filter((i) => i !== event.id);
    });
  }, []);

  return [bookedEventsIds, toggle];
}
