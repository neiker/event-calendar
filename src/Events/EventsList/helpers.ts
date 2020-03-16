import { format } from 'date-fns';
import { FilterValue } from '../Filters/Filters';
import { Event, EventsSection } from '../types';

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

export function getSections(events: Event[], filters: FilterValue): EventsSection[] {
  return events.reduce((acc: EventsSection[], event: Event) => {
    if (!filterEvent(filters, event)) {
      return acc;
    }

    const date = format(new Date(event.startDate), 'EEEE io LLLL');
    const section = acc.find((i) => i.key === date);

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
