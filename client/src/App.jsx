import { useState, useEffect } from 'react';
import phonebook_service from './services/phonebook_service';
import { ListOfEntries } from './components/ListOfEntries';
import { AddNewForm } from './components/AddNewForm';
import { UpdateForm } from './components/UpdateForm';

const App = () => {
  const [entries, setEntries] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [personToUpdate, setPersonToUpdate] = useState(null);

  const fetchEntries = async () => {
    let response = await phonebook_service.getAll();
    response = await response.data;
    setEntries(response);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div>
      <AddNewForm entries={entries} setEntries={setEntries} />
      {entries && (
        <ListOfEntries
          entries={entries}
          setEntries={setEntries}
          setShowUpdateForm={setShowUpdateForm}
          showUpdateForm={showUpdateForm}
          setPersonToUpdate={setPersonToUpdate}
        />
      )}
      {showUpdateForm && <UpdateForm personToUpdate={personToUpdate} setShowUpdateForm={setShowUpdateForm} />}
    </div>
  );
};

export default App;
