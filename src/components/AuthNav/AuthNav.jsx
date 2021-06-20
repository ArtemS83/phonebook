import { NavLink } from 'react-router-dom';
import style from './AuthNav.module.scss';

const AuthNav = () => {
  return (
    <nav className={style.list}>
      <NavLink
        exact
        to="/register"
        className={style.link}
        activeClassName={style.activeLink}
      >
        Sing up
      </NavLink>

      <NavLink
        to="/login"
        className={style.link}
        activeClassName={style.activeLink}
      >
        Login
      </NavLink>
    </nav>
  );
};

export default AuthNav;
