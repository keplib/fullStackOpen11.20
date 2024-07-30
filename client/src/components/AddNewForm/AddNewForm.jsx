/* eslint-disable react/prop-types */
import { useState } from 'react';
import { addNewEntry } from '../../services/phonebook_service';

export const AddNewForm = ({ entries, setEntries, triggerNotification }) => {
  const initialFormData = {
    name: '',
    phone: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await addNewEntry({ name: formData.name, number: formData.phone });
      setFormData(initialFormData);
      setEntries(entries.concat(response.data));
      triggerNotification(`You added ${response.data.name} to the phonebook!`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <button type="submit" data-testid="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};
