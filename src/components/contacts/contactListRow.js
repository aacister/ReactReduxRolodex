import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const ContactListRow = ({contact}) => {
  return (
    <tr>
      <td><Link to={'/contacts/' + contact._id}>{contact.first_name} {contact.last_name}</Link></td>
    </tr>
  );
};

ContactListRow.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactListRow;
