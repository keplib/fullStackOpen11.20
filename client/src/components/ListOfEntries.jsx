/* eslint-disable react/prop-types */
import phonebook_service from '../services/phonebook_service';

export const ListOfEntries = ({ entries }) => {
  const deleteHandler = async (person) => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      await phonebook_service.deleteEntry(person._id);
      // setEntries(entries.filter((item) => item.id !== person.id));
    }
  };

  return (
    <>
      <h2>Phone Numbers</h2>
      {entries.map((entry) => (
        <p key={entry._id}>
          {entry.name} - {entry.phone} <button onClick={() => deleteHandler(entry)}>delete</button>
        </p>
      ))}
    </>
  );
};
