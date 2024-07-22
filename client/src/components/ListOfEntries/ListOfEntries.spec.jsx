import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, vi } from 'vitest';
import { ListOfEntries } from './ListOfEntries';
import { mockEntries } from './__mocks__/mockEntries';
import * as phonebookService from '../../services/phonebook_service';

test('Component renders the correct amount of entries', async () => {
  render(<ListOfEntries entries={mockEntries} />);

  const persons = screen.getAllByTestId('person-entry');

  expect(persons).toHaveLength(mockEntries.length);
});

test('Entries can be deleted', async () => {
  const mockDeleteService = vi
    .spyOn(phonebookService, 'deleteEntry')
    .mockResolvedValue({ data: { name: 'test', phone: 'test' } });

  window.confirm = vi.fn().mockImplementation(() => true);

  render(<ListOfEntries entries={mockEntries} />);

  const deleteButtons = screen.getAllByRole('button', { name: /delete/i });

  fireEvent.click(deleteButtons[0]);

  await waitFor(() => {
    expect(window.confirm).toHaveBeenCalled();
  });

  // await waitFor(() => {
  //   expect(mockDeleteService).toHaveBeenCalled();
  // });
});
