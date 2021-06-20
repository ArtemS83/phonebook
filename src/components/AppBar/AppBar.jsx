import { useSelector } from 'react-redux';
import Navigation from 'components/Navigation';
import UserMenu from 'components/UserMenu';
import AuthNav from 'components/AuthNav';
import style from './AppBar.module.scss';
import authSelectors from 'redux/auth/auth-selectors';

const AppBar = () => {
  const IsAuthenticated = useSelector(authSelectors.getIsAuthenticated);
  return (
    <header className={style.header}>
      <Navigation />
      {IsAuthenticated ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default AppBar;
