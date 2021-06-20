import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { filterContacts } from '../../redux/contacts/contacts-actions';
import reducer from '../../redux/contacts/contacts-reducer';
import Filter from './Filter';

describe('Filter', () => {
  it('should render', () => {
    const { container } = render(
      <Provider store={store.store}>
        <Filter text="TEXT render" />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('handleInputFindChange should return a new object', () => {
    expect(filterContacts('Test change text')).toMatchObject({
      type: 'contacts/filter',
      payload: 'Test change text',
    });
  });

  it('reducer-loading', () => {
    const initialState = {
      items: [],
      filter: 'AAA',
      loading: false,
      error: null,
    };

    const action = { type: 'contacts/addContactRequest' };
    const newState = reducer(initialState, action);

    expect(newState).toMatchObject({
      items: [],
      filter: 'AAA',
      loading: true,
      error: null,
    });
  });

  it('reducer-filter', () => {
    const initialState = {
      items: [],
      filter: 'BBB',
      loading: false,
      error: null,
    };

    const action = { type: 'contacts/filter', payload: 'AAA' };
    const newState = reducer(initialState, action);

    expect(newState).toMatchObject({
      items: [],
      filter: 'AAA',
      loading: false,
      error: null,
    });
  });
});
