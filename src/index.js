import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import {loadContacts} from './actions/contactActions';
import { loadHobbies} from './actions/hobbyActions';


const store = configureStore();

store.dispatch(loadContacts());
store.dispatch(loadHobbies());


render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
