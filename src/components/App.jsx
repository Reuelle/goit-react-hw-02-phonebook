// src/components/App.jsx
import { Component } from 'react';
import { nanoid } from 'nanoid';
import PhonebooksForm from './ContactForm/ContactForm';
import PhonebookList from './ContactList/ContactList';
import PhonebooksFilter from './ContactFilter/ContactFilter';
import contacts from './SampleData';
import styles from './Contact.module.css';

class App extends Component {
  state = {
    contacts: [...contacts],
    filter: '',
  };

  componentDidMount() {
    // Debugging initial state
    console.log('Initial contacts:', this.state.contacts);
  }

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: newContacts };
    });
  };

  addContact = ({ name, number }) => {
    if (this.isDuplicate(name, number)) {
      alert(`${name}: ${number} already exists`);
      return false;
    }

    this.setState(prevState => {
      const { contacts } = prevState;

      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return { contacts: [newContact, ...contacts] };
    });
    return true;
  };

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  isDuplicate(name, number) {
    const normalizedTitle = name.toLowerCase();
    const normalizedAuthor = number.toLowerCase();
    const { contacts } = this.state;
    const result = contacts.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedTitle &&
        number.toLowerCase() === normalizedAuthor
      );
    });

    return Boolean(result);
  }

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normalizedFilter) ||
        number.toLowerCase().includes(normalizedFilter)
      );
    });

    return result;
  }

  render() {
    const { addContact, removeContact, handleFilter } = this;
    const contacts = this.getFilteredContacts();
    const isContacts = Boolean(contacts.length);

    return (
      <div className={styles['center-container']}>
        <div className={styles.wrapper}>
          <div className={styles.block}>
            <h1>Phonebook</h1>
            <PhonebooksForm onSubmit={addContact} />
          </div>
          <div className={styles.block}>
            <PhonebooksFilter handleChange={handleFilter} />
            {isContacts && (
              <PhonebookList removeContact={removeContact} contacts={contacts} />
            )}
            {!isContacts && <p>No contacts in list</p>}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
