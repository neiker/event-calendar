import React from 'react';

import './App.css';
import { EventsList, Type } from './Events/EventsList';
import { NavBar } from './NavBar';

export const App: React.FunctionComponent = () => {
  const [type, setType ] = React.useState<Type>('ALL');

  return (
    <>
      <NavBar onTypeClick={setType} />

      <EventsList type={type}/>
    </>
  );
}

