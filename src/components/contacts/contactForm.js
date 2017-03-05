import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';

class ContactForm extends React.Component {
  render() {
    return (
      <div>
        <form>
          <TextInput
            name="first_name"
            label="First Name"
            value={this.props.contact.first_name}
            onChange={this.props.onChange}/>

          <TextInput
            name="last_name"
            label="Last Name"
            value={this.props.contact.last_name}
            onChange={this.props.onChange}/>

          <TextInput
            name="email"
            label="Email"
            value={this.props.contact.email}
            onChange={this.props.onChange}/>

          <input
            type="submit"
            disabled={this.props.saving}
            className="btn btn-primary"
            onClick={this.props.onSave}/>
        </form>
      </div>
  );
  }
}

ContactForm.propTypes = {
  contact: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default ContactForm;
