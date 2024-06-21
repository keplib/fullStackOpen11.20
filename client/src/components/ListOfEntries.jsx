/* eslint-disable react/prop-types */
export const ListOfEntries = ({ entries }) => {
  return (
    <>
      <h2>Phone Numbers</h2>
      {entries.map((entry) => (
        <p key={entry._id}>
          {entry.name} - {entry.phone}
        </p>
      ))}
    </>
  );
};
