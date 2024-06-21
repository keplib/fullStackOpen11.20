/* eslint-disable react/prop-types */
import { useState } from 'react';
import phonebook_service from '../services/phonebook_service';

export const AddNewForm = ({ onAddNew }) => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data: ', formData);
    phonebook_service.addNewEntry({ name: formData.name, phone: formData.phone });
    setFormData(initialFormData);
    onAddNew();
  };

  return (
    <div>
      <h2>Add new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
