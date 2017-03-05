import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ContactForm from './contactForm';
import * as contactActions from '../../actions/contactActions';

class ContactPage extends React.Component {
  constructor(props, context){
    super(props);
    this.state =
    {
      isEditing: false,
      contact: this.props.contact
    };
    this.updateContactState = this.updateContactState.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.saveContact = this.saveContact.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.contact._id != nextProps.contact._id) {
      this.setState({contact: nextProps.contact});
    }
  }

  deleteContact(event) {
    this.props.actions.deleteContact(this.state.contact)
  }

  saveContact(event) {
    event.preventDefault();
    this.props.actions.updateContact(this.state.contact);
  }

  updateContactState(event) {
    const field = event.target.name;
    const contact = this.state.contact;
    contact[field] = event.target.value;
    return this.setState({contact: contact});
  }

  toggleEdit() {
    this.setState({isEditing: !this.state.isEditing})
  }



  render() {
    const buttonStyle = {
      margin: 5
    };

      if(this.state.isEditing){
        return (
          <div>
            <h4>Edit Contact</h4>
            <ContactForm
          contact={this.state.contact}
          onSave={this.saveContact}
          onChange={this.updateContactState} />
          </div>
        )
      }
    return (
      <div className="col-md-8 col-md-offset-2">
        <h1>{this.props.contact.first_name} {this.props.contact.last_name}</h1>
        <p>email: {this.props.contact.email}</p>
        <button
          onClick={this.toggleEdit}
          className="btn btn-primary"
          style={buttonStyle}>
          Edit
        </button>
         <button
           onClick={this.deleteContact}
           className="btn btn-danger"
           style={buttonStyle}
           >
           Delete
       </button>
      </div>
    );
  }
}


ContactPage.propTypes = {
  contact: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function getContactById(contacts, id) {
  let contact = contacts.find(contact => contact._id == id)
  return Object.assign({}, contact)
}

function mapStateToProps(state, ownProps) {
  let contact = {first_name: '', last_name: '', email: ''};
  const contactId = ownProps.params.id;
  if (state.contacts.length > 0) {
    contact = getContactById(state.contacts, ownProps.params.id);
  //  contact = Object.assign({}, state.contacts.find(contact => contact._id  id)
  }
  return {contact: contact};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(contactActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);
