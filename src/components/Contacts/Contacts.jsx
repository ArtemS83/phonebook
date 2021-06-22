import { getVisibleContacts } from '../../redux/contacts/contacts-selectors';
import { useSelector } from 'react-redux';
import ContactItem from '../ContactItem';
import style from './Contacts.module.scss';

const Contacts = () => {
  const visibleContacts = useSelector(getVisibleContacts);

  return (
    <ul className={style.list}>
      {visibleContacts.map(({ id, name, phone }) => (
        <ContactItem key={id} id={id} name={name} number={phone} />
      ))}
    </ul>
  );
};

export default Contacts;
