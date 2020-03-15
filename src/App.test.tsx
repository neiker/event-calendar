import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';

test('renders tabs', () => {
  const { getByText } = render(<App />);

  expect(getByText(/All Events/i)).toBeInTheDocument();
  expect(getByText(/My Events/i)).toBeInTheDocument();
});
