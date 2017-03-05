import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import ContactsPage from './components/contacts/contactsPage';
import ContactPage from './components/contacts/contactPage';
import NewContactPage from './components/contacts/newContactPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={ContactsPage} />
    <Route path="/contacts" component={ContactsPage}>
      <Route path="/contacts/new" component={NewContactPage} />
      <Route path="/contacts/:id" component={ContactPage} />
    </Route>

  </Route>
);
