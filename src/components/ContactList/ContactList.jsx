import { useDispatch, useSelector } from 'react-redux';
import { List, Item, Button } from './ContactList.styled';
import { deleteContacts } from 'redux/contacts/contactsSlice';
import { getContacts } from 'redux/contacts/selectors';
import { getFilter } from 'redux/filter/selectors';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const filteredContacts = contacts.filter(contact => {
    if (contact && contact.name) {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    }
    return false;
  });

  const handleDelete = contactId => {
    dispatch(deleteContacts(contactId));
  };

  return (
    <List>
      {filteredContacts.map(({ id, name, number }) => (
        <Item key={id}>
          {name}: {number}
          <Button type="button" onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </Item>
      ))}
    </List>
  );
};

export default ContactList;
