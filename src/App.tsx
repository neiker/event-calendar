import React from 'react';

import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

import { EventsList } from './Events/EventsList';
import { Header } from './Header';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#01739f',
    },
    secondary: {
      main: '#397724',
    },
    error: {
      main: '#c44333',
    },
    warning: {
      main: '#f5842e',
    },
    text: {
      primary: '#303c43',
      secondary: '#909e9c',
      disabled: '#e8e9ea',
    },
  },
});

export const App: React.FunctionComponent = () => (
  <ThemeProvider theme={theme}>
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
  </ThemeProvider>
);
