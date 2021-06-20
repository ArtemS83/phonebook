import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/contacts-operations';
import { getContacts } from '../../redux/contacts/contacts-selectors';
import swal from 'sweetalert';
import Button from '../Button';
import style from './ContactsInputForm.module.scss';

const ContactsInputForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getContacts);

  const dispatch = useDispatch();
  const handleInputChange = ({ target }) => {
    const { value, name } = target;
    name === 'name' ? setName(value) : setNumber(value);
  };

  const handleAddContact = e => {
    e.preventDefault();

    if (!number || !name) {
      alert(`Name or Number not entered `);
      return;
    }

    const normalizedName = name.toLowerCase().trim();
    const isExistingUser = contacts.find(
      contact => contact.name.toLowerCase() === normalizedName,
    );

    if (isExistingUser) {
      swal('Warning!', `${name} is already in contacts!`, 'warning');
      return;
    }

    dispatch(addContact(name, number));
    setName('');
    setNumber('');
  };

  return (
    <form className={style.form} onSubmit={handleAddContact}>
      <label className={style.label}>
        Name
        <input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          placeholder="Enter name contact"
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
      <Button title="Add contact" type="submit" />
    </form>
  );
};

export default ContactsInputForm;
