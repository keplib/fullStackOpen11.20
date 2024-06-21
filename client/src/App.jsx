import { useState, useEffect } from 'react';
import phonebook_service from './services/phonebook_service';

const App = () => {
  const [entries, setEntries] = useState([]);

  console.log(entries);

  useEffect(() => {
    const fetchEntries = async () => {
      let response = await phonebook_service.getAll();
      response = await response.data;
      setEntries(response);
    };

    fetchEntries();
  }, []);

  return (
    <div>
      <p>Hello from client</p>
      <p>{entries && JSON.stringify(entries)}</p>
    </div>
  );
};

export default App;
