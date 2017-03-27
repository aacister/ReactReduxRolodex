import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ContactForm from './contactForm';
import * as contactActions from '../../actions/contactActions';


class NewContactPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contact: {
        first_name: '',
        last_name: '',
        email: '',
        hobbies: []
      },
      saving: false
    };

    this.saveContact = this.saveContact.bind(this);
    this.updateContactState = this.updateContactState.bind(this);
    this.updateContactHobbies = this.updateContactHobbies.bind(this);
  }


  updateContactState(event) {
    const field = event.target.name;
    const contact = this.state.contact;
    contact[field] = event.target.value;
    return this.setState({contact: contact});
  }

  updateContactHobbies(event){
	const contact = this.state.contact;
	const hobbyTitle = event.target.value;
	const hobby = this.props.checkBoxHobbies.filter(hobby => hobby.title === hobbyTitle)[0];
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

  saveContact(event) {
    event.preventDefault();
    this.props.actions.createContact(this.state.contact)
  }

  render() {
    return (
      <div>
        <h4>New Contact</h4>
        <ContactForm
          contact={this.state.contact}
          hobbies={this.props.checkBoxHobbies}
          onSave={this.saveContact}
          onChange={this.updateContactState}
          onHobbyChange={this.updateContactHobbies}  />
      </div>
    );
  }
}

function hobbiesForCheckBoxes(hobbies) {
  return hobbies.map(hobby => {
    hobby['checked'] = false;
    return hobby;
  });
}

NewContactPage.propTypes = {
  checkBoxHobbies: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let checkBoxHobbies = [];
  if (state.hobbies.length > 0) {
    checkBoxHobbies = hobbiesForCheckBoxes(Object.assign([], state.hobbies));
  }

  return {
    checkBoxHobbies: checkBoxHobbies
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(contactActions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewContactPage);
