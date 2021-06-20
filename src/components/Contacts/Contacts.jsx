import { getVisibleContacts } from '../../redux/contacts/contacts-selectors';
import { useSelector } from 'react-redux';
import ContactItem from '../ContactItem';
import style from './Contacts.module.scss';

const Contacts = () => {
  const visibleContacts = useSelector(getVisibleContacts);

  return (
    <ul className={style.list}>
      {visibleContacts.map(({ id, name, number }) => (
        <ContactItem key={id} id={id} name={name} number={number} />
      ))}
    </ul>
  );
};

export default Contacts;
