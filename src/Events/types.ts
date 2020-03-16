export interface RawEvent {
  city: number;
  endDate: string;
  id: number;
  isFree: boolean;
  name: string;
  startDate: string;
}

export interface Event extends Omit<RawEvent, 'city'> {
  city: City;
  booked: boolean;
}

export interface City {
  id: number;
  name: string;
}

export type EventsSection = {
  key: string;
  events: Event[];
};
