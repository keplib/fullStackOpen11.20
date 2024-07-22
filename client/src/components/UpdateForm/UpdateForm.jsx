/* eslint-disable react/prop-types */
import { useState } from 'react';
import phonebook_service from '../../services/phonebook_service';

export const UpdateForm = ({ personToUpdate, setShowUpdateForm, entries, setEntries }) => {
  const initialFormData = {
    name: personToUpdate.name,
    phone: personToUpdate.number,
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
    const response = await phonebook_service.updateEntry(personToUpdate.id, {
      name: formData.name,
      number: formData.phone,
    });
    const updatedList = entries.map((entry) => {
      if (entry.id === personToUpdate.id) return response.data;
      else return entry;
    });
    setShowUpdateForm(false);
    setEntries(updatedList);
  };

  return (
    <div>
      <h2>Update entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={initialFormData.name}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={initialFormData.phone}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
