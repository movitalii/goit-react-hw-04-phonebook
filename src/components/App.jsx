import {useState} from 'react';
import Form  from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import css from './App.module.css';
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');
  
  const onAddingContacts = newContact => {
    contacts.find(contact => contact.name === newContact.name)
      ? alert(`${newContact.name} is already in contacts`)
      : setContacts(contact => [...contact, newContact]);
  };

 const onFilterHandler = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const onDeleteHandler = contactId => {
    const notAid = contact => contact.id !== contactId;

    const updatedList = contacts.filter(notAid);

    setContacts(updatedList);
  };

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