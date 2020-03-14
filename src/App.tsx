import React from 'react';

import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import './App.css';
import { EventsList } from './Events/EventsList';
import { Header } from './Header';


export const App: React.FunctionComponent = () => (
  <BrowserRouter>
    <Header />

    <Switch>
      <Route path="/" exact>
        <EventsList type="ALL" />
      </Route>
      <Route path="/booked" exact>
        <EventsList type="BOOKED" />
      </Route>
    </Switch>
  </BrowserRouter>
);
