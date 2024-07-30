/* eslint-disable react/prop-types */
import './Notification.css';

export const Notification = ({ content }) => {
  return (
    <div className="notification-container">
      <p>{content}</p>
    </div>
  );
};
