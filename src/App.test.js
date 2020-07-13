import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/SWAT UNSPLASH TAKE HOME/i);
  expect(linkElement).toBeInTheDocument();
});
