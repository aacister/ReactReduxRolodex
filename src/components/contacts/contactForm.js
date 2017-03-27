import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import CheckBox from '../common/CheckBox';

class ContactForm extends React.Component {

  constructor(props){
	super(props);
	this.makeCheckBoxes = this.makeCheckBoxes.bind(this);
  }

  makeCheckBoxes(){
	return this.props.hobbies.map(hobby => {
		return (
			<CheckBox
				item={hobby}
				handleChange={this.props.onHobbyChange}
        key={hobby.id}
				 />
		)
	})
  }
  render() {

	const boxes = this.makeCheckBoxes();
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

	  {boxes}

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
  contact: PropTypes.object.isRequired,
  hobbies: React.PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onHobbyChange: PropTypes.func.isRequired
};

export default ContactForm;
