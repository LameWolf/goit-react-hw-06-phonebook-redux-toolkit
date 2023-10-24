import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const { nanoid } = require('nanoid');

const contactsInitialState = { list: [] };

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContacts: {
      reducer(state, action) {
        state.list.push(action.payload);
      },
      prepare(newContact) {
        return {
          payload: {
            ...newContact,
            id: nanoid(),
          },
        };
      },
    },
    deleteContacts: {
      reducer(state, action) {
        state.list = state.list.filter(
          contact => contact.id !== action.payload
        );
      },
    },
  },
});

export const { addContacts, deleteContacts } = contactsSlice.actions;
const contactsReducer = contactsSlice.reducer;

const persistConfig = {
  key: 'contacts',
  storage,
};

export const persistedContactsReducer = persistReducer(
  persistConfig,
  contactsReducer
);
