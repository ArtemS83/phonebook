import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'components/Button';
import style from './UserMenu.module.scss';
import authSelectors from '../../redux/auth/auth-selectors';
import authOperations from '../../redux/auth/auth-operations';

const UserMenu = () => {
  const name = useSelector(authSelectors.getUserName); // getUserAvatar
  const avatar = useSelector(authSelectors.getUserAvatar);
  const dispatch = useDispatch();

  const hendelLogOut = useCallback(() => {
    dispatch(authOperations.logOut());
  }, [dispatch]);

  return (
    <div className={style.userMenu}>
      <img src={avatar} alt={name} width="40" height="40" />
      <p>{name}</p>
      <Button title="Logout" type="button" onClick={hendelLogOut} />
    </div>
  );
};

export default UserMenu;
