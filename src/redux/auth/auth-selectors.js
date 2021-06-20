// const getIsAuthenticated = state => Boolean(state.auth.token);
const getIsAuthenticated = state => state.auth.isAuthenticated;
const getUsername = state => state.auth.user.name;
const getError = state => state.auth.error;
const getLoadingUser = state => state.auth.isLoading;
const getErrorLogin = state => state.auth.errorLogin;
const getErrorRegister = state => state.auth.errorRegister;

/*eslint-disable*/
export default {
  getIsAuthenticated,
  getUsername,
  getError,
  getLoadingUser,
  getErrorLogin,
  getErrorRegister,
};
