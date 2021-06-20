import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterContacts } from '../../redux/contacts/contacts-actions';
import { getFilter } from '../../redux/contacts/contacts-selectors';
import style from './Filter.module.scss';

const Filter = ({ text }) => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleInputFindChange = useCallback(
    ({ target }) => {
      const { value } = target;
      dispatch(filterContacts(value));
    },
    [dispatch],
  );
  // const handleInputFindChange = ({ target }) => {
  //   const { value } = target;
  //   dispatch(filterContacts(value));
  // };

  return (
    <>
      <p data-testid="filtertextTest" className={style.title}>
        {text}
      </p>
      <input
        data-testid="filterInputTest"
        className={style.input}
        type="text"
        name="filter"
        value={filter}
        placeholder="Enter name contact"
        onChange={handleInputFindChange}
      />
    </>
  );
};

Filter.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Filter;
