import React, {PropTypes} from 'react';

class CheckBox extends React.Component {
	render(){
    const checkStyle = {
      margin: 10
    };
		return(
			<div>
				<div>
					<label style={checkStyle}>{this.props.item.title}</label>
					<input type="checkbox" name={this.props.item.title}
						value={this.props.item.title}
						checked={this.props.item.checked}
						onChange={this.props.handleChange} />
				</div>
			</div>

		);
	}
}

CheckBox.propTypes = {
	item: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired
};

export default CheckBox;
