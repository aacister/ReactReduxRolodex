import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import HobbyList from '../hobbies/hobbyList';
import ContactForm from './contactForm';
import * as contactActions from '../../actions/contactActions';

class ContactPage extends React.Component {
  constructor(props, context){
    super(props);
    this.state =
    {
      isEditing: false,
      contact: this.props.contact,
      contactHobbies: this.props.contactHobbies,
      checkBoxHobbies: this.props.checkBoxHobbies
    };

    this.updateContactState = this.updateContactState.bind(this);
    this.updateContactHobbies = this.updateContactHobbies.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.saveContact = this.saveContact.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
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

  updateContactHobbies(event){
	const contact = this.state.contact;
	const hobbyTitle= event.target.value;
	const hobby = this.state.checkBoxHobbies.filter(hobby => hobby.title === hobbyTitle)[0];
	const checked = !hobby.checked;
	hobby['checked'] = !hobby.checked;
	if(checked){
		contact.hobbies.push(hobby);
	}
	else{
    contact.hobbies = contact.hobbies.filter(h => {
      return h._id !== hobby._id;
    });
	}
	this.setState({contact: contact});
  }

  componentWillReceiveProps(nextProps) {
      if (this.props.contact._id !== nextProps.contact._id) {
        this.setState({contact: nextProps.contact});
      }

      if(this.props.checkBoxHobbies.length < nextProps.checkBoxHobbies.length)
  	     this.setState({contactHobbies: nextProps.contactHobbies, checkBoxHobbies: nextProps.checkBoxHobbies});
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
          hobbies={this.state.checkBoxHobbies}
          onSave={this.saveContact}
          onChange={this.updateContactState}
	  onHobbyChange={this.updateContactHobbies} />
          </div>
        )
      }
    return (
      <div className="col-md-8 col-md-offset-2">
        <h1>{this.state.contact.first_name} {this.state.contact.last_name}</h1>
        <p>email: {this.state.contact.email}</p>
	<HobbyList hobbies={this.props.contactHobbies} />
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
  contactHobbies: PropTypes.array.isRequired,
  checkBoxHobbies: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};


function collectContactHobbies(hobbies, contact) {
  let selected = hobbies.map(hobby => {
    if (contact.hobbies.filter(h => h._id === hobby._id).length > 0) {
      return hobby;
    }
  })
  return selected.filter(el => el !== undefined)
}

function hobbiesForCheckBoxes(hobbies, contact=null){

	return hobbies.map(hobby => {
		if(contact && contact.hobbies.filter(h => h._id === hobby._id).length > 0) {
			hobby['checked'] = true;
		}
		else
		{
			hobby['checked'] = false;
		}
		return hobby;
	});
}

function getContactById(contacts, id) {
  let contact = contacts.find(contact => contact._id === id)
  return Object.assign({}, contact)
}


function mapStateToProps(state, ownProps) {
  const stateHobbies = Object.assign([], state.hobbies);
  let checkBoxHobbies = [];
  let contactHobbies = [];

  let contact = {first_name: '', last_name: '', email: '', hobbies: []};
  const contactId = ownProps.params.id;

  if (state.contacts.length > 0 ) {
    contact = getContactById(state.contacts, contactId);
    if(contact.hobbies){
    if( contact.hobbies.length > 0){
	     checkBoxHobbies = hobbiesForCheckBoxes(stateHobbies, contact);
	     contactHobbies = collectContactHobbies(stateHobbies, contact);
    }
    else
    {
	     checkBoxHobbies = hobbiesForCheckBoxes(stateHobbies);
    }
  }
  }
  return {contact: contact, checkBoxHobbies: checkBoxHobbies, contactHobbies: contactHobbies};
}



function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(contactActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);
