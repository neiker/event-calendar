import React from 'react';





import './App.css';
import { EventsList, Type } from './Events/EventsList';
import { NavBar } from './NavBar';



function App() {
  const [type, setType ] = React.useState<Type>('ALL');

  return (
    <>
      <NavBar onTypeClick={setType} />

      <EventsList type={type}/>
    </>
  );
}

export default App;
