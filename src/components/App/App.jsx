import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from '../../redux/store';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import { MainTitle, Contacts } from './App.styled';

export const App = () => {
  return (
    <Provider store={store}>
      <div>
        <MainTitle>Phonebook</MainTitle>
        <ContactForm />
        <Contacts>Contacts</Contacts>
        <Filter />
        <ContactList />
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </Provider>
  );
};
