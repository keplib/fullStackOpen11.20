import { render, screen } from '@testing-library/react';
import { TestComponent } from './TestComponent';

test('renders content', () => {
  render(<TestComponent />);

  screen.debug();
  const element = screen.getByText('Update entry');
  expect(element).toBeDefined();
});
