import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, vi } from 'vitest';
import { UpdateForm } from './UpdateForm';
import { updateEntry } from '../../services/phonebook_service';
import { mockEntries } from './__mocks__/mockEntries';

vi.mock('../../services/phonebook_service');

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
});

test('Component renders with the correct persons values', async () => {
  const personToUpdate = { name: 'TestPerson', number: '12345' };

  render(<UpdateForm personToUpdate={personToUpdate} />);

  const nameInput = screen.getByTestId('name-input');
  const numberInput = screen.getByTestId('number-input');

  expect(nameInput.value).toBe('TestPerson');
  expect(numberInput.value).toBe('12345');
});

test('Entries can be updated', async () => {
  vi.mocked(updateEntry).mockResolvedValue({ data: { name: 'test', number: 'test' } });
  const personToUpdate = { name: 'TestPerson', number: '12345' };

  const mockSetEntries = vi.fn();
  const mockSetShowUpdateForm = vi.fn();

  render(
    <UpdateForm
      entries={mockEntries}
      setEntries={mockSetEntries}
      personToUpdate={personToUpdate}
      setShowUpdateForm={mockSetShowUpdateForm}
    />
  );

  const submitButton = screen.getByRole('button', { name: /submit/i });

  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(updateEntry).toHaveBeenCalled();
  });
});
