/* eslint-disable react/prop-types */
import phonebook_service from '../services/phonebook_service';

export const ListOfEntries = ({ entries, setEntries, setShowUpdateForm, showUpdateForm, setPersonToUpdate }) => {
  const deleteHandler = async (person) => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      const response = await phonebook_service.deleteEntry(person._id);
      setEntries(entries.filter((item) => item._id !== response.data._id));
    }
  };

  const updateHandler = (person) => {
    console.log('update will be triggered');
    console.log('selected person is: ', person);
    setPersonToUpdate(person);
    setShowUpdateForm(!showUpdateForm);
  };

  return (
    <>
      <h2>Phone Numbers</h2>
      {entries.map((entry) => (
        <p key={entry._id}>
          {entry.name} - {entry.phone} <button onClick={() => deleteHandler(entry)}>delete</button>
          <button onClick={() => updateHandler(entry)}>update</button>
        </p>
      ))}
    </>
  );
};
