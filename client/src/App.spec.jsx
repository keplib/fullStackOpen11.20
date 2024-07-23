import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, vi } from 'vitest';
import App from './App';
import { getAll } from './services/phonebook_service';

vi.mock('./services/phonebook_service');

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
});

test('Component renders the correct amount of entries', async () => {
  vi.mocked(getAll).mockResolvedValue({ data: { name: 'test', number: 'test' } });
  render(<App />);

  await waitFor(() => {
    expect(getAll).toHaveBeenCalled();
  });
});
