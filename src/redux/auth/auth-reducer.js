import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import authActions from './auth-actions';

const initialUserState = { name: null, email: null };

const user = createReducer(initialUserState, {
  [authActions.registerSuccess]: (_, action) => action.payload.user,
  [authActions.loginSuccess]: (_, action) => action.payload.user,
  [authActions.logoutSuccess]: () => initialUserState,
  [authActions.getCurrentUserSuccess]: (_, action) => action.payload, // без user,так как приходит просто user
});

const token = createReducer(null, {
  [authActions.registerSuccess]: (_, action) => action.payload.token,
  [authActions.loginSuccess]: (_, action) => action.payload.token,
  [authActions.logoutSuccess]: () => null,
});

const setError = (_, { payload }) => payload;

const error = createReducer(null, {
  [authActions.registerError]: setError,
  [authActions.registerRequest]: () => null,
  [authActions.loginError]: setError,
  [authActions.loginRequest]: () => null,
  [authActions.logoutError]: setError,
  [authActions.logoutRequest]: () => null,
  [authActions.getCurrentUserError]: setError,
  [authActions.getCurrentUserRequest]: () => null,
  //
  [authActions.loginErrorMessageCancel]: () => null,
  [authActions.registerErrorMessageCancel]: () => null,
});
const errorLogin = createReducer(null, {
  [authActions.loginError]: setError,
  [authActions.loginRequest]: () => null,
  [authActions.loginErrorMessageCancel]: () => null,
});
const errorRegister = createReducer(null, {
  [authActions.registerError]: setError,
  [authActions.registerRequest]: () => null,
  [authActions.registerErrorMessageCancel]: () => null,
});

const isAuthenticated = createReducer(false, {
  [authActions.registerSuccess]: () => true,
  [authActions.loginSuccess]: () => true,
  [authActions.getCurrentUserSuccess]: () => true,
  [authActions.registerError]: () => false,
  [authActions.loginError]: () => false,
  [authActions.getCurrentUserError]: () => false,
  [authActions.logoutSuccess]: () => false,
});

const isLoading = createReducer(false, {
  [authActions.registerRequest]: () => true,
  [authActions.registerSucces]: () => false,
  [authActions.registerError]: () => false,

  [authActions.loginRequest]: () => true,
  [authActions.loginSuccess]: () => false,
  [authActions.loginError]: () => false,

  [authActions.logoutRequest]: () => true,
  [authActions.logoutSuccess]: () => false,
  [authActions.logoutError]: () => false,

  [authActions.getUserRequest]: () => true,
  [authActions.getCurrentUserSuccess]: () => false,
  [authActions.getCurrentCurrentUserError]: () => false,
});

export default combineReducers({
  user,
  isAuthenticated,
  token,
  error,
  isLoading,
  errorLogin,
  errorRegister,
});
