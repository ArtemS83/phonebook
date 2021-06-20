import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'components/Button';
import style from './UserMenu.module.scss';
import authSelectors from '../../redux/auth/auth-selectors';
import authOperations from '../../redux/auth/auth-operations';

const UserMenu = () => {
  const name = useSelector(authSelectors.getUsername);

  const dispatch = useDispatch();

  const hendelLogOut = useCallback(() => {
    dispatch(authOperations.logOut());
  }, [dispatch]);

  // const hendelLogOut = () => {
  //   dispatch(authOperations.logOut());
  // };

  return (
    <div className={style.userMenu}>
      <p>Welcome, {name}</p>
      <Button title="Logout" type="button" onClick={hendelLogOut} />
    </div>
  );
};

export default UserMenu;
