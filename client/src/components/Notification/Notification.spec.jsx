import { render, waitFor, screen } from '@testing-library/react';
import { Notification } from './Notification';

vi.mock('../../services/phonebook_service');

test('Component renders with right content', async () => {
  const notificationContent = 'Test Content';
  render(<Notification content={notificationContent} />);

  const notificationText = screen.getByText('Test Content');
  await waitFor(() => {
    expect(notificationText).toBeInTheDocument();
  });
});
