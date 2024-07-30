import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { AddNewForm } from './AddNewForm';
import { addNewEntry } from '../../services/phonebook_service';

vi.mock('../../services/phonebook_service');

test('Component triggers the right fucntion on Submit and trigger notification', async () => {
  vi.mocked(addNewEntry).mockResolvedValue({ data: { name: 'John Doe', number: '123342' } });

  const mockEntries = [];
  const mockSetEntries = vi.fn();
  const mockTriggerNotification = vi.fn();
  render(
    <AddNewForm entries={mockEntries} setEntries={mockSetEntries} triggerNotification={mockTriggerNotification} />
  );

  const nameInput = screen.getByLabelText(/name/i);
  const phoneInput = screen.getByLabelText(/phone/i);
  const submitButton = screen.getByTestId('submit-button');

  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(phoneInput, { target: { value: '123342' } });

  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(addNewEntry).toHaveBeenCalledWith({ name: 'John Doe', number: '123342' });
  });

  await waitFor(() => {
    expect(mockTriggerNotification).toHaveBeenCalledWith('You added John Doe to the phonebook!');
  });
});
