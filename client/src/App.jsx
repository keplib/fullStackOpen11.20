import { useState, useEffect } from 'react';
import phonebook_service from './services/phonebook_service';
import { ListOfEntries } from './components/ListOfEntries/ListOfEntries';
import { AddNewForm } from './components/AddNewForm/AddNewForm';
import { UpdateForm } from './components/UpdateForm/UpdateForm';
import { Notification } from './components/Notification/Notification';

const App = () => {
  const [entries, setEntries] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [personToUpdate, setPersonToUpdate] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationContent, setNotificationContent] = useState('');

  const fetchEntries = async () => {
    let response = await phonebook_service.getAll();
    response = await response.data;
    setEntries(response);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  useEffect(() => {
    let timer;
    if (showNotification) {
      timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showNotification]);

  const triggerNotification = (content) => {
    setNotificationContent(content);
    setShowNotification(true);
  };

  return (
    <div>
      <h2>Phonebook app</h2>
      {showNotification && <Notification content={notificationContent} />}
      <AddNewForm entries={entries} setEntries={setEntries} triggerNotification={triggerNotification} />
      {entries && (
        <ListOfEntries
          entries={entries}
          setEntries={setEntries}
          setShowUpdateForm={setShowUpdateForm}
          showUpdateForm={showUpdateForm}
          setPersonToUpdate={setPersonToUpdate}
          triggerNotification={triggerNotification}
        />
      )}
      {showUpdateForm && (
        <UpdateForm
          personToUpdate={personToUpdate}
          setShowUpdateForm={setShowUpdateForm}
          entries={entries}
          setEntries={setEntries}
          triggerNotification={triggerNotification}
        />
      )}
    </div>
  );
};

export default App;
