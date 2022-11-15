import React from 'react';
import { Form } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };
  // ========Adding contacts=========
  onAddingContacts = newContact => {
    const contacts = this.state.contacts;
    contacts.find(contact => contact.name === newContact.name)
      ? alert(`${newContact.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, newContact],
        }));
  };

  // ===========Filter Contacts==============

  onFilterHandler = e => {
    const { value } = e.currentTarget;
    this.setState({ filter: value });
  };
  // ===========Delete Contacts==============
  onDeleteHandler = contactId => {
    const notAid = contact => contact.id !== contactId;

    const updatedList = this.state.contacts.filter(notAid);

    this.setState({ contacts: updatedList });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {

      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({contacts: parsedContacts})
    }    
  }

  // =========Render=========

  render() {
    const { contacts, filter } = this.state;
    const { onAddingContacts, onFilterHandler, onDeleteHandler } = this;

    return (
      <div className={css.wrapper}>
        <h2 className={css.form__title}>Phonebook</h2>
        <Form onAddingContacts={onAddingContacts} contacts={contacts} />
        <h2 className={css.form__title}>Contacts</h2>
        <Filter filteredContent={filter} onFilterHandler={onFilterHandler} />
        <Contacts
          contacts={contacts}
          filteredContent={filter}
          handleDelete={onDeleteHandler}
        />
      </div>
    );
  }
}