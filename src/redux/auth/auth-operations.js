import axios from 'axios';
import authActions from './auth-actions';

// axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';
axios.defaults.baseURL = 'https://phonebook-my-api.herokuapp.com/api';
// axios.defaults.baseURL = 'http://localhost:3000/api';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

/*
 * POST @ /users/signup
 * body { name, email, password }
 *
 * После успешной регистрации добавляем токен в HTTP-заголовок
 */
const register = credentials => dispatch => {
  dispatch(authActions.registerRequest());
  axios
    .post('/users/signup', credentials)
    .then(({ data }) => {
      const user = data.data;
      dispatch(authActions.registerSuccess(user));
    })

    .catch(error => {
      if (error.message.includes(409)) {
        dispatch(authActions.notVarifyUser());
      }
      dispatch(authActions.registerError(error.message));
    });
};

/*
 * POST @ /users/login
 * body:
 *    { email, password }
 *
 * После успешного логина добавляем токен в HTTP-заголовок
 */
const logIn = credentials => dispatch => {
  dispatch(authActions.loginRequest());
  axios
    .post('/users/login', credentials)
    .then(({ data }) => {
      // const user = data.data.user;
      const userToken = data.data.token;
      token.set(userToken);
      // token.set(data.token);
      dispatch(authActions.loginSuccess(data.data));
    })
    .catch(error => {
      // if (error.message.includes(401)) {
      //   dispatch(authActions.notVarifyUser());
      // }
      dispatch(authActions.loginError(error.message));
    });
};

/*
 * POST @ /users/logout
 * headers:
 *    Authorization: Bearer token
 *
 * 1. После успешного логаута, удаляем токен из HTTP-заголовка
 */
const logOut = () => dispatch => {
  dispatch(authActions.logoutRequest());
  axios
    .post('/users/logout')
    .then(() => {
      token.unset();
      dispatch(authActions.logoutSuccess());
    })
    .catch(error => dispatch(authActions.logoutError(error.message)));
};

/*
 * GET @ /users/current
 * headers:
 *    Authorization: Bearer token
 *
 * 1. Забираем токен из стейта через getState()//  state => state.auth.token;
 * 2. Если токена нет, выходим не выполняя никаких операций
 * 3. Если токен есть, добавляет его в HTTP-заголовок и выполянем операцию
 */
const getCurrentUser = () => (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();

  if (!persistedToken) {
    return;
  }
  token.set(persistedToken);
  dispatch(authActions.getCurrentUserRequest());
  axios
    .get('/users/current')
    .then(({ data }) => {
      dispatch(authActions.getCurrentUserSuccess(data.data));
    })
    .catch(error => dispatch(authActions.getCurrentUserError(error.message)));
};

/*eslint-disable*/
export default {
  register,
  logOut,
  logIn,
  getCurrentUser,
};
