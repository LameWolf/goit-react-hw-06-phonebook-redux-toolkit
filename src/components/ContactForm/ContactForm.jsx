import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import { addContacts } from 'redux/contacts/contactsSlice';
import { getContacts } from 'redux/contacts/selectors';
import { Form, Label, Input, Button } from './ContactForm.styled';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();
  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    const isExist = contacts.find(contact => contact.name === formData.name);

    if (isExist) {
      toast.warning(`${formData.name} is already in contacts.`);
      return;
    }

    const contact = { ...formData, id: nanoid() };
    dispatch(addContacts(contact));

    reset();
  };

  const reset = () => {
    setFormData({ name: '', number: '' });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor={nameInputId}>
        Name:
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={formData.name}
          placeholder="Enter your name"
          onChange={handleChange}
          id={nameInputId}
          required
        />
      </Label>
      <Label htmlFor={numberInputId}>
        Number:
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={formData.number}
          placeholder="Enter your number"
          onChange={handleChange}
          id={numberInputId}
          required
        />
      </Label>

      <Button type="submit">Add contact</Button>
    </Form>
  );
};

export default ContactForm;
