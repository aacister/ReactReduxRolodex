import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ContactList from './contactList';
import NewContactPage from './newContactPage';
import * as actions from '../../actions/contactActions';

class ContactsPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      contacts: [],
      filteredContacts: [],
      filtering: false,
      keyword: ''
    };
    this.filterContacts = this.filterContacts.bind(this);
    this.filterList = this.filterList.bind(this);

  }

  componentWillMount() {
    console.log('ComponentWillMount event: ' +JSON.stringify(this.props.contacts));
    if (this.props.contacts[0].id == '') {
      this.props.actions.loadContacts();

    }
  }

  componentWillReceiveProps(nextProps){
    if(this.state.filtering){
      this.setState({
        filteredContacts: this.filterContacts(nextProps.contacts)
      });
    }
    console.log('ComponentWillReceiveProps event: ' + JSON.stringify(this.state.contacts));
  }

  filterContacts(contacts){
    console.log('filterContacts event for state: ' + JSON.stringify(this.state.keyword));
    return contacts.filter((contact) =>{
      return contact.last_name.toLowerCase().search(this.state.keyword.toLowerCase()) !== -1;
    });
  }

  filterList(event){

    let keyword = event.target.value;

    if(!keyword){
      this.setState({filtering: false});
      return;
    }

//    console.log('filterList event with props: ' + JSON.stringify(this.props.contacts));
//    console.log('filterList event with state: ' + JSON.stringify(this.state.contacts));

    this.setState({
      filteredContacts: this.filterContacts(this.props.contacts),
      filtering: true,
      keyword: keyword
    });
  }
  render() {

    const headerStyle = {
      textAlign: 'center',
      color: '#000080'
    }

    const rowStyle = {
      margin: 15
    };

    const searchBoxStyle = {
      width: '80%'
    };

    const formRowStyle = {
      backgroundColor: '#F0F8FF',
      padding: 15,
      margin: 15
    }


    console.log('Rendering');
    console.log('Rendering filteredContacts: ' + JSON.stringify(this.state.filteredContacts));
    let cs = this.state.filtering ? this.state.filteredContacts : this.props.contacts;

    if (cs.length == 0) {
      return (
        <div class="container">
          <div className="row">
            <div classname="col-md-12">
              <h4>No contacts exist.</h4>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
      <div className="row" style={rowStyle}>
        <div className="col-md-12">
          <h1 style={headerStyle}>React-Redux Rolodex</h1>
        </div>
      </div>

      <div className="row">
          <div className="col-md-6">
              <div className="row" style={rowStyle}>
                <div className="col-md-12">
                  <Link to={'/contacts/new'} className="btn btn-primary">
                    + contacts
                  </Link>
                </div>
              </div>
              <div className="row" style={rowStyle}>
                <div className="col-md-12" >
                        <input
                          placeholder="Filter contacts by last name..."
                          onKeyUp={this.filterList}
                          style={searchBoxStyle}
                        />
                  </div>
              </div>
            </div>
            <div className="col-md-6">
            </div>
        </div>

        <div className="row" style={formRowStyle}>
            <div className="col-md-6">
              <div className="row" style={rowStyle}>
                <div className="col-md-12">
                  <ContactList contacts={cs} />
                </div>
              </div>
            </div>
            <div className="col-md-6" >
              {this.props.children}
            </div>
          </div>
        </div>

    );
  }
}

ContactsPage.propTypes = {
  contacts: PropTypes.array.isRequired,
  children: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  if (state.contacts.length > 0) {
    console.log('mapStateToProps event: ' +JSON.stringify(state.contacts));
    return {
      contacts: state.contacts

    };
  } else {
    return {
      contacts: [{id: '', first_name: '', last_name: '', email: ''}]
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)};

}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPage);
