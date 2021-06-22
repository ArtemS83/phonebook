import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Section from 'components/Section';
import Notification from 'components/Notification';
import Button from 'components/Button';
import Loader from 'react-loader-spinner';
import style from './RegisterPage.module.scss';
import authOperations from '../../redux/auth/auth-operations';
import authSelectors from '../../redux/auth/auth-selectors';
//
import authActions from '../../redux/auth/auth-actions';

const RegisterPage = () => {
  const [nameUser, setNameUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const isLoading = useSelector(authSelectors.getLoadingUser);
  const error = useSelector(authSelectors.getErrorRegister);
  const register = useSelector(authSelectors.getIsRegister);

  const inputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.loginErrorMessageCancel());
    inputRef.current.focus();
  }, [dispatch]);

  const handleChange = ({ target }) => {
    const { value, name, checked } = target;
    switch (name) {
      case 'nameUser':
        setNameUser(value);
        return;
      case 'email':
        setEmail(value);
        return;
      case 'password':
        setPassword(value);
        return;
      case 'agreed':
        setAgreed(checked);
        return;
      default:
        return;
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !nameUser || !password) {
      alert('Please enter all data');
      return;
    }
    const newUser = {
      name: nameUser,
      email,
      password,
    };

    dispatch(authOperations.register(newUser));
    // TODO
    // setNameUser('');
    // setEmail('');
    // setPassword('');
    // setAgreed(false);
  };

  return (
    <>
      <Section title="">
        <h1 className={style.title}>Sing up</h1>

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
        {/* {error && <Notification message="Please, login or verify email!" />} */}
        {/* {error && <Notification message={error} />} */}
        {register && <Notification message="Please, login or verify email!" />}

        <form onSubmit={handleSubmit} className={style.form} autoComplete="off">
          <label className={style.label}>
            Name
            <input
              type="text"
              name="nameUser"
              value={nameUser}
              placeholder="Enter name"
              onChange={handleChange}
              ref={inputRef}
            />
          </label>
          <label className={style.label}>
            Email
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter email"
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </label>
          <label className={style.labelCheckbox}>
            <input
              className={style.checkbox}
              type="checkbox"
              name="agreed"
              checked={agreed}
              onChange={handleChange}
              title="Check the box to register"
              required
            />
            <span>I agree to the terms of service</span>
          </label>
          <Button title="Sing up" type="submit" disable={!agreed} />
        </form>
      </Section>
    </>
  );
};

export default RegisterPage;
