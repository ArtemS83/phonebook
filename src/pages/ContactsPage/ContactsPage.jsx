import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import Section from 'components/Section';
import ContactsInputForm from 'components/ContactsInputForm';
import Filter from 'components/Filter';
import Contacts from 'components/Contacts';
import Notification from 'components/Notification';
import {
  getContacts,
  getIsLoadingSelector,
} from 'redux/contacts/contacts-selectors';
import { fetchContacts } from 'redux/contacts/contacts-operations';

const ContactsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getIsLoadingSelector);
  return (
    <>
      <Section title="Add new contact">
        <ContactsInputForm />
      </Section>
      <Section title="Contacts">
        {/* {isLoading && <h1>Загружаем...</h1>} */}
        <Loader
          type="Puff"
          color="#1f6ce0"
          height={70}
          width={70}
          visible={isLoading}
        />
        {contacts.length > 0 ? (
          <>
            <p>Total contacts: {contacts.length}</p>
            <Filter text="Find contact by name" />
            <Contacts />
          </>
        ) : (
          <Notification message="No contacts" />
        )}
      </Section>
    </>
  );
};

export default ContactsPage;
