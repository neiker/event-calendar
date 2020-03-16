import React from 'react';

export function useBookings(): [number[], (id: number) => void] {
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
