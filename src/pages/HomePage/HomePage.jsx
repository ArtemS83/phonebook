import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authActions from '../../redux/auth/auth-actions';
import imageHomePage from 'images/phonebookPoster.png';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.registerErrorMessageCancel());
    dispatch(authActions.loginErrorMessageCancel());
  }, [dispatch]);

  return <img src={imageHomePage} alt="My phonebook poster" />;
};

export default HomePage;
