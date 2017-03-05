import * as types from './actionTypes';
import contactApi from '../api/contactApi';

export function loadContactsSuccess(contacts) {
  return {type: types.LOAD_CONTACTS_SUCCESS, contacts};
}

export function loadContacts() {
  return function(dispatch) {
    return contactApi.getAllContacts().then(contacts => {
      dispatch(loadContactsSuccess(contacts));
    }).catch(error => {
      throw(error);
    });
  };
}

export function createContactSuccess(contact) {
  return {type: types.CREATE_CONTACT_SUCCESS, contact}
}

export function createContact(contact) {
  return function (dispatch) {
    return contactApi.createContact(contact).then(responseContact => {
      dispatch(createContactSuccess(responseContact));
      return responseContact;
    }).catch(error => {
      throw(error);
    });
  };
}


export function updateContactSuccess(contact) {
  return {type: types.UPDATE_CONTACT_SUCCESS, contact}
}


export function updateContact(contact) {
  return function (dispatch) {
    return contactApi.updateContact(contact).then(responseContact => {
      dispatch(updateContactSuccess(responseContact));
    }).catch(error => {
      throw(error);
    });
  };
}

export function deleteContactSuccess(contact) {
  return {type: types.DELETE_CONTACT_SUCCESS, contact}
}


export function deleteContact(contact) {
  return function(dispatch) {
    return contactApi.deleteContact(contact).then(() => {
      console.log(`Deleted ${contact._id}`)
      dispatch(deleteContactSuccess(contact));
      return;
    }).catch(error => {
      throw(error);
    })
  }
}
