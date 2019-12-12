import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
  // member variables
  static propTypes = {
    // propTypes only works for annotation required
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  };

  // state (member var)
  state = {
    // a string
    query: ''
  };

  // method
  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  };

  clearQuery = () => {
    this.setState({ query: '' })
  };

  // main output
  render() {
    // assign var
    const { contacts, onDeleteContact } = this.props;
    const { query } = this.state;

    let showingContacts;

    // if the query has value (contacts)
    if (query) {
      // todo
      const match = new RegExp(escapeRegExp(query), 'i');
      // get the contacts matched
      showingContacts = contacts.filter((contact) => match.test(contact.name))
    } else {
      // get the whole contacts
      showingContacts = contacts
    }

    // sort the contacts
    showingContacts.sort(sortBy('name'));

    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search contacts'
            value={query}
            // listener
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <Link
            to='/create'
            className='add-contact'
          >Add Contact</Link>
        </div>

        {/*if the length of the contacts don't match, then do*/}
        {showingContacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <span>Now showing {showingContacts.length} of {contacts.length} total</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}

        <ol className='contact-list'>
          {showingContacts.map((contact) => (
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar' style={{
                backgroundImage: `url(${contact.avatarURL})`
              }}/>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button onClick={() => onDeleteContact(contact)} className='contact-remove'>
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default ListContacts
