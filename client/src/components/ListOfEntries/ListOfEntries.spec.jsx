import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, vi } from 'vitest';
import { ListOfEntries } from './ListOfEntries';
import { mockEntries } from './__mocks__/mockEntries';
import { deleteEntry } from '../../services/phonebook_service';

vi.mock('../../services/phonebook_service');

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
});

test('Component renders the correct amount of entries', async () => {
  render(<ListOfEntries entries={mockEntries} />);

  const persons = screen.getAllByTestId('person-entry');

  expect(persons).toHaveLength(mockEntries.length);
});

test('Entries can be deleted and notification will be triggered', async () => {
  vi.mocked(deleteEntry).mockResolvedValue({ data: { name: 'Test Name', number: '12345' } });

  const mockSetEntries = vi.fn();
  const mockTriggerNotification = vi.fn();

  window.confirm = vi.fn().mockImplementation(() => true);

  render(
    <ListOfEntries entries={mockEntries} setEntries={mockSetEntries} triggerNotification={mockTriggerNotification} />
  );

  const deleteButtons = screen.getAllByRole('button', { name: /delete/i });

  fireEvent.click(deleteButtons[0]);

  await waitFor(() => {
    expect(window.confirm).toHaveBeenCalled();
  });

  await waitFor(() => {
    expect(deleteEntry).toHaveBeenCalled();
  });

  await waitFor(() => {
    expect(mockTriggerNotification).toHaveBeenCalledWith('You deleted Test Name from the phonebook!');
  });
});

test('Entries wont be deleted when user denies', async () => {
  const mockSetEntries = vi.fn();

  window.confirm = vi.fn().mockImplementation(() => false);

  render(<ListOfEntries entries={mockEntries} setEntries={mockSetEntries} />);

  const deleteButtons = screen.getAllByRole('button', { name: /delete/i });

  fireEvent.click(deleteButtons[0]);

  await waitFor(() => {
    expect(window.confirm).toHaveBeenCalled();
  });

  await waitFor(() => {
    expect(deleteEntry).not.toHaveBeenCalled();
  });
});

test('Clicking on Update will trigger update handler ', async () => {
  const mockSetPersonToUpdate = vi.fn();
  const mockSetShowUpdateForm = vi.fn();

  render(
    <ListOfEntries
      entries={mockEntries}
      setPersonToUpdate={mockSetPersonToUpdate}
      setShowUpdateForm={mockSetShowUpdateForm}
    />
  );

  const updateButtons = screen.getAllByRole('button', { name: /update/i });

  fireEvent.click(updateButtons[0]);

  expect(mockSetPersonToUpdate).toHaveBeenCalled();
  expect(mockSetShowUpdateForm).toHaveBeenCalled();
});
