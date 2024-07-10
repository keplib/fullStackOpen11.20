/* eslint-disable react/prop-types */
import phonebook_service from '../services/phonebook_service';

export const ListOfEntries = ({ entries, setEntries, setShowUpdateForm, showUpdateForm, setPersonToUpdate }) => {
  const deleteHandler = async (person) => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      const response = await phonebook_service.deleteEntry(person.id);
      setEntries(entries.filter((item) => item.id !== response.data.id));
    }
  };

  const updateHandler = async (person) => {
    setPersonToUpdate(person);
    setShowUpdateForm(!showUpdateForm);
  };

  return (
    <>
      <h2>Phone Numbers</h2>
      {entries.map((entry) => (
        <p key={entry.id}>
          {entry.name} - {entry.number} <button onClick={() => deleteHandler(entry)}>delete</button>
          <button onClick={() => updateHandler(entry)}>update</button>
        </p>
      ))}
    </>
  );
};
