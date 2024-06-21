import { useState, useEffect } from 'react';
import phonebook_service from './services/phonebook_service';
import { ListOfEntries } from './components/ListOfEntries';
import { AddNewForm } from './components/AddNewForm';

const App = () => {
  const [entries, setEntries] = useState([]);

  console.log(entries);

  const fetchEntries = async () => {
    let response = await phonebook_service.getAll();
    response = await response.data;
    console.log('fetchEntry triggered!');
    setEntries(response);
  };

  useEffect(() => {
    // const fetchEntries = async () => {
    //   let response = await phonebook_service.getAll();
    //   response = await response.data;
    //   setEntries(response);
    // };

    fetchEntries();
  }, []);

  return (
    <div>
      <AddNewForm onAddNew={fetchEntries} />
      {entries && <ListOfEntries entries={entries} />}
    </div>
  );
};

export default App;
