import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import style from './FormUpdateContact.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { updateContact } from '../../redux/contacts/contacts-operations';
import Button from 'components/Button';
import { getContacts } from '../../redux/contacts/contacts-selectors';
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = () =>
  toast("🦄 You don't change contact!", {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

const FormUpdateContact = ({
  id,
  nameForUpdate,
  numberForUpdate,
  onCloseModal,
}) => {
  const [name, setName] = useState(nameForUpdate);
  const [number, setNumber] = useState(numberForUpdate);

  const contacts = useSelector(getContacts);

  const dispatch = useDispatch();

  const handleInputChange = useCallback(({ target }) => {
    const { value, name } = target;
    name === 'name' ? setName(value) : setNumber(value);
  }, []);
  // const handleInputChange = ({ target }) => {
  //   const { value, name } = target;
  //   name === 'name' ? setName(value) : setNumber(value);
  // };
  const handleSubmitUpdateContact = useCallback(
    e => {
      e.preventDefault();

      if (name === nameForUpdate && number === numberForUpdate) {
        notify();
        return;
      }

      const normalizedName = name.toLowerCase().trim();

      const isExistingUser = contacts
        .filter(contact => contact.id !== id)
        .find(contact => contact.name.toLowerCase() === normalizedName);

      if (isExistingUser) {
        swal('Warning!', `${name} is already in contacts!`, 'warning');
        return;
      }

      dispatch(updateContact(id, name, number));
      setName('');
      setNumber('');
      onCloseModal();
    },
    [
      dispatch,
      onCloseModal,
      name,
      number,
      id,
      contacts,
      nameForUpdate,
      numberForUpdate,
    ],
  );
  // const handleSubmitUpdateContact = e => {
  //   e.preventDefault();

  //   if (name === nameForUpdate && number === numberForUpdate) {
  //     notify();
  //     return;
  //   }

  //   const normalizedName = name.toLowerCase().trim();

  //   const isExistingUser = contacts
  //     .filter(contact => contact.id !== id)
  //     .find(contact => contact.name.toLowerCase() === normalizedName);

  //   if (isExistingUser) {
  //     swal('Warning!', `${name} is already in contacts!`, 'warning');
  //     return;
  //   }

  //   dispatch(updateContact(id, name, number));
  //   setName('');
  //   setNumber('');
  //   onCloseModal();
  // };

  return (
    <>
      <form className={style.form} onSubmit={handleSubmitUpdateContact}>
        <label className={style.label}>
          Name
          <input
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            placeholder="Enter contact"
            onChange={handleInputChange}
          />
        </label>
        <label className={style.label}>
          Number
          <input
            type="tel"
            name="number"
            value={number}
            pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
            title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
            required
            placeholder="Enter number phone"
            onChange={handleInputChange}
          />
        </label>
        <div className={style.divButton}>
          <Button title="Cancel" type="button" onClick={onCloseModal} />
          <Button title="Update" type="submit" />
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

FormUpdateContact.propTypes = {
  nameForUpdate: PropTypes.string.isRequired,
  numberForUpdate: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default FormUpdateContact;
