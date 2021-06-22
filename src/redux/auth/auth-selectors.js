// const getIsAuthenticated = state => Boolean(state.auth.token);
const getIsAuthenticated = state => state.auth.isAuthenticated;
const getUserName = state => state.auth.user.name;
const getUserAvatar = state => state.auth.user.avatarURL;
const getIsRegister = state => state.auth.isRegister;
const getError = state => state.auth.error;
const getLoadingUser = state => state.auth.isLoading;
const getErrorLogin = state => state.auth.errorLogin;
const getErrorRegister = state => state.auth.errorRegister;

/*eslint-disable*/
export default {
  getIsAuthenticated,
  getUserName,
  getError,
  getLoadingUser,
  getErrorLogin,
  getErrorRegister,
  getUserAvatar,
  getIsRegister,
};
