import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { AddNewForm } from './AddNewForm';
import { addNewEntry } from '../../services/phonebook_service';

vi.mock('../../services/phonebook_service');

test('Component triggers the right fucntion on Submit', async () => {
  vi.mocked(addNewEntry).mockResolvedValue({ data: { name: 'test', number: 'test' } });

  const mockEntries = [];
  const mockSetEntries = vi.fn();
  render(<AddNewForm entries={mockEntries} setEntries={mockSetEntries} />);

  const nameInput = screen.getByLabelText(/name/i);
  const phoneInput = screen.getByLabelText(/phone/i);
  const submitButton = screen.getByTestId('submit-button');

  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(phoneInput, { target: { value: '123342' } });

  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(addNewEntry).toHaveBeenCalledWith({ name: 'John Doe', number: '123342' });
  });
});
