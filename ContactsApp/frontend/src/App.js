import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
  state = {
    contacts: []
  };

  // get the contacts and save them in the state
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }

  // remove the specific contact in the saved contacts
  removeContact = (contact) => {
    this.setState((state) => ({
      // save all the contacts which are not contact.id
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }));
    // remove the contact in the database
    ContactsAPI.remove(contact)
  };

  // add new contact in the db and state
  createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        // add a new contact in the state
        contacts: state.contacts.concat([ contact ])
      }))
    })
  }

  // render the homepage
  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          // component
          <ListContacts
            // assign callback functions
            // this means this component has such two member variables
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
          />
        )}/>
        <Route path='/create' render={({ history }) => (
          // component
          <CreateContact
            // assign a callback function
            onCreateContact={(contact) => {
              this.createContact(contact);
              history.push('/')  // todo
            }}
          />
        )}/>
      </div>
    )
  }
}

export default App;
