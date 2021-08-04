import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { lazy, Suspense } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Container from 'components/Container';
import AppBar from 'components/AppBar';
import ToggleButton from 'components/ToggleButton';

import Loader1 from 'components/Loader1';
// import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import PrivateRouteWithoutReduxHooks from 'components/PrivateRouteWithoutReduxHooks';
import authOperations from 'redux/auth/auth-operations';
import style from './App.module.scss';

const HomePage = lazy(() =>
  import('pages/HomePage' /* webpackChunkName: "home-page" */),
);

const ContactsPage = lazy(() =>
  import('pages/ContactsPage' /* webpackChunkName: "contacts-page" */),
);

const RegisterPage = lazy(() =>
  import('pages/RegisterPage' /* webpackChunkName: "register-page" */),
);

const LoginPage = lazy(() =>
  import('pages/LoginPage' /* webpackChunkName: "login-page" */),
);

const App = () => {
  const [theme, setTheme] = useState('light');

  const isLight = theme === 'light' ? style.lightTheme : style.darkTheme;

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      window.localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');

    if (localTheme) {
      setTheme(localTheme);
    } else {
      window.localStorage.setItem('theme', 'light');
    }
  }, []);

  const dispatch = useDispatch();

  useEffect(() => dispatch(authOperations.getCurrentUser()), [dispatch]);

  return (
    <div className={isLight}>
      <AppBar />
      <Container>
        <ToggleButton theme={theme} toggleTheme={toggleTheme} />
        <Suspense
          fallback={
            // <div>Loading...</div>
            <Loader1 />
          }
        >
          <Switch>
            <PublicRoute path="/" exact component={HomePage} />
            {/* <PrivateRoute
              path="/contacts"
              redirectTo="/login"
              component={ContactsPage}
            /> */}
            <PrivateRouteWithoutReduxHooks path="/contacts" redirectTo="/login">
              <ContactsPage />
            </PrivateRouteWithoutReduxHooks>
            {/*таким образом не передаются в пропсах location, history,params. Для их вызова используем route-hooks: useLocation, useHistory, useParams */}

            <PublicRoute
              path="/register"
              restricted
              redirectTo="/contacts"
              component={RegisterPage}
            />
            <PublicRoute
              path="/login"
              restricted
              redirectTo="/contacts"
              component={LoginPage}
            />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Container>
    </div>
  );
};

export default App;
