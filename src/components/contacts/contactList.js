
import React, {PropTypes} from 'react';
import ContactListRow from './contactListRow';

const ContactList = ({contacts}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map(contact =>
          <ContactListRow key={contact._id} contact={contact} />
        )}
      </tbody>
    </table>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired
};

export default ContactList;
