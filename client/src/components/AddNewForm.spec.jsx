import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { AddNewForm } from './AddNewForm';
import * as phonebookService from '../services/phonebook_service';

test('renders content', async () => {
  const mockSubmitService = vi
    .spyOn(phonebookService, 'addNewEntry')
    .mockResolvedValue({ data: { name: 'test', phone: 'test' } });

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
    expect(mockSubmitService).toHaveBeenCalledWith({ name: 'John Doe', number: '123342' });
  });
});
