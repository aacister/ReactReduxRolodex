import { config } from '../config/config';

class ContactApi {
  static getAllContacts() {
    return fetch(`${config.api}/contacts`).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static updateContact(contact) {
    const request = new Request(`${config.api}/contacts/${contact._id}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({contact: contact})
    });
    return fetch(request).then(response => {
  
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static createContact(contact) {
    const request = new Request(`${config.api}/contacts/`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({contact: contact})
    });
    return fetch(request).then(response => {

      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteContact(contact) {
    const request = new Request(`${config.api}/contacts/${contact._id}`, {
      method: 'DELETE'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default ContactApi;
