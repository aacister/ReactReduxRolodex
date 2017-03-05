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
        email: ''
      },
      saving: false
    };

    this.saveContact = this.saveContact.bind(this);
    this.updateContactState = this.updateContactState.bind(this);
  }


  updateContactState(event) {
    const field = event.target.name;
    const contact = this.state.contact;
    contact[field] = event.target.value;
    return this.setState({contact: contact});
  }

  saveContact(event) {
    event.preventDefault();
    console.log('Saving contact: ' + JSON.stringify(this.state.contact));
    this.props.actions.createContact(this.state.contact)
  }

  render() {
    return (
      <div>
        <h4>New Contact</h4>
        <ContactForm
          contact={this.state.contact}
          onSave={this.saveContact}
          onChange={this.updateContactState} />
      </div>
    );
  }
}


NewContactPage.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(contactActions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewContactPage);
