import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/contacts-operations';
import FormUpdateContact from 'components/FormUpdateContact';
import Button from 'components/Button';
import Modal from 'components/Modal';
import { MdPhoneAndroid } from 'react-icons/md';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  item: {
    marginBottom: 10,
    padding: 10,
    // backgroundColor: 'rgba(152, 226, 226, 0.74)',
    border: ' 2px solid rgb(125, 19, 196)',
    borderRadius: 4,
    boxShadow: '2px 6px 8px -2px #a09c9c',
    fontSize: 18,
    fontWeight: 500,

    background: 'linear-gradient(45deg, rgb(115, 181, 235), #6dd5fa, #ffffff)',
    backgroundSize: '400% 400%',
    animation: 'gradient 10s ease infinite',
  },
  '@keyframes gradient': {
    '0%': { backgroundPosition: '0 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0 50%' },
  },
  name: {
    marginLeft: 10,
  },
  number: {
    marginLeft: 6,
    color: 'rgb(79, 119, 238)',
  },
  divButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 8,
    '& button:not(:last-child)': {
      marginRight: 8,
    },
  },
  divSpan: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 8,
  },
});

const ContactItem = ({ name, number, id }) => {
  const classes = useStyles();

  const [showModal, setShowModal] = useState(false);

  const toggleModal = useCallback(() => {
    setShowModal(prevShowModal => !prevShowModal);
  }, []);

  // const toggleModal = () => {
  //   setShowModal(prevShowModal => !prevShowModal);
  // };

  const dispatch = useDispatch();

  const hendelDeleteContact = useCallback(() => dispatch(deleteContact(id)), [
    dispatch,
    id,
  ]);
  // const hendelDeleteContact = () => dispatch(deleteContact(id));

  return (
    <>
      <li className={classes.item}>
        <p className={classes.name}>{name}</p>
        <div className={classes.divSpan}>
          <MdPhoneAndroid color={'#2a2a2a'} />
          <p className={classes.number}>{number}</p>
        </div>
        <div className={classes.divButton}>
          <Button title="Update" onClick={toggleModal} />
          <Button title="Delete" onClick={hendelDeleteContact} />
        </div>
      </li>
      {showModal && (
        <Modal onCloseModal={toggleModal}>
          <FormUpdateContact
            id={id}
            nameForUpdate={name}
            numberForUpdate={number}
            onCloseModal={toggleModal}
          />
        </Modal>
      )}
    </>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default ContactItem;
