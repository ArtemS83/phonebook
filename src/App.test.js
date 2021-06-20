import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import store from './redux/store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <>
      <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>,
    div,
  );
});
