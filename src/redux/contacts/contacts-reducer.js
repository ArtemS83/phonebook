import { createReducer, combineReducers } from '@reduxjs/toolkit';
import {
  addContactRequest,
  addContactSuccess,
  addContactError,
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
  filterContacts,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  updateContactRequest,
  updateContactSuccess,
  updateContactError,
} from '../../redux/contacts/contacts-actions';
import authActions from '../../redux/auth/auth-actions';

const initialState = [];
const items = createReducer(initialState, {
  [fetchContactsSuccess]: (_, action) => action.payload,
  [addContactSuccess]: (state, action) => [...state, action.payload],
  [deleteContactSuccess]: (state, action) =>
    state.filter(({ id }) => id !== action.payload),
  [updateContactSuccess]: (state, action) =>
    state.map(contact =>
      contact.id === action.payload.id ? action.payload : contact,
    ),
  [authActions.logoutSuccess]: () => [],
});

const filter = createReducer('', {
  [filterContacts]: (_, action) => action.payload.trim(),
});

const loading = createReducer(false, {
  [fetchContactsRequest]: () => true,
  [fetchContactsSuccess]: () => false,
  [fetchContactsError]: () => false,

  [addContactRequest]: () => true,
  [addContactSuccess]: () => false,
  [addContactError]: () => false,

  [deleteContactRequest]: () => true,
  [deleteContactSuccess]: () => false,
  [deleteContactError]: () => false,

  [updateContactRequest]: () => true,
  [updateContactSuccess]: () => false,
  [updateContactError]: () => false,
});

const setError = (_, { payload }) => payload;

const error = createReducer(null, {
  [fetchContactsError]: setError,
  [addContactError]: setError,
  [deleteContactError]: setError,
  [updateContactError]: setError,
});

export default combineReducers({
  items,
  filter,
  loading,
  error,
});
