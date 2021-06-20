import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Section from 'components/Section';
import Button from 'components/Button';
import Notification from 'components/Notification';
import Loader from 'react-loader-spinner';
import style from './LoginPage.module.scss';
import authOperations from '../../redux/auth/auth-operations';
import authSelectors from '../../redux/auth/auth-selectors';
//
import authActions from '../../redux/auth/auth-actions';

const LoginPage = () => {
  //{name:'Artem',email:'aqu@ukr.net', passworld : '1111111'}
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLoading = useSelector(authSelectors.getLoadingUser);
  const error = useSelector(authSelectors.getErrorLogin);

  const inputRef = useRef();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);

  useEffect(() => {
    dispatch(authActions.registerErrorMessageCancel());
    inputRef.current.focus();
  }, [dispatch]);

  const handleChangeEmail = e => setEmail(e.target.value);
  const handleChangePassword = e => setPassword(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter email and password');
    }
    const user = {
      email,
      password,
    };

    dispatch(authOperations.logIn(user));
    // setEmail('');
    // setPassword('');
  };

  return (
    <>
      <Section title="">
        <h1 className={style.title}>Login</h1>

        {isLoading && (
          <div className={style.divLoader}>
            <Loader
              type="Puff"
              color="#1f6ce0"
              height={50}
              width={50}
              visible={isLoading}
            />
          </div>
        )}
        {error && <Notification message={error} />}
        <form onSubmit={handleSubmit} className={style.form} autoComplete="off">
          <label className={style.label}>
            Email
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter email"
              onChange={handleChangeEmail}
              ref={inputRef}
            />
          </label>

          <label className={style.label}>
            Password
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter password"
              minLength="7"
              onChange={handleChangePassword}
            />
          </label>
          <Button title="Login" type="submit" />
        </form>
      </Section>
    </>
  );
};

export default LoginPage;
