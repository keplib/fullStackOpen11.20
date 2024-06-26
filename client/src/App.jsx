import { useState, useEffect } from 'react';
import phonebook_service from './services/phonebook_service';
import { ListOfEntries } from './components/ListOfEntries';
import { AddNewForm } from './components/AddNewForm';

const App = () => {
  const [entries, setEntries] = useState([]);

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
      {entries && <ListOfEntries entries={entries} />}
    </div>
  );
};

export default App;
