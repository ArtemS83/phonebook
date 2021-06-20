import { NavLink } from 'react-router-dom';
import style from './Navigation.module.scss';
import { useSelector } from 'react-redux';
import imageHomePage from 'images/21.png';
import authSelectors from 'redux/auth/auth-selectors';

const Navigation = () => {
  const IsAuthenticated = useSelector(authSelectors.getIsAuthenticated);

  return (
    <nav className={style.list}>
      <NavLink
        exact
        to="/"
        className={style.link}
        activeClassName={style.activeLink}
      >
        <div className={style.divLogo}>
          <img
            className={style.logo}
            src={imageHomePage}
            alt="phonebook poster"
            width="50"
            height="50"
          />
        </div>
      </NavLink>

      <NavLink
        exact
        to="/"
        className={style.link}
        activeClassName={style.activeLink}
      >
        Home
      </NavLink>

      {IsAuthenticated && (
        <NavLink
          to="/contacts"
          className={style.link}
          activeClassName={style.activeLink}
        >
          Contacts
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
