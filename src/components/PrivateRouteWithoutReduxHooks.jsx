import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authSelectors from 'redux/auth/auth-selectors';
/**
 * - Если маршрут приватный и пользователь залогинен, рендерит компонент
 * - В противном случае рендерит Redirect на /login
 */
const PrivateRouteWithoutReduxHooks = ({
  children,
  redirectTo,
  ...routeProps
}) => {
  const IsAuthenticated = useSelector(authSelectors.getIsAuthenticated);
  // const IsVerify = false;
  //  const IsVerify = true;
  return (
    <Route {...routeProps}>
      {IsAuthenticated ? children : <Redirect to={redirectTo} />}
    </Route>
    // <Route
    //   {...routeProps}
    //   render={({ location }) =>
    //     IsAuthenticated ? (
    //       children
    //     ) : (
    //       <Redirect
    //         to={{
    //           pathname: redirectTo,
    //           state: { from: location },
    //         }}
    //       />
  );
};
// />
// );
// };

export default PrivateRouteWithoutReduxHooks;
