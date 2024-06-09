import { Component } from 'react';
import { nanoid } from 'nanoid';
import PhonebooksForm from './ContactForm/ContactForm';
import PhonebookList from './ContactList/ContactList';
import PhonebooksFilter from './ContactFilter/ContactFilter';
import contacts from './SampleData.Json';
import styles from './Contact.module.scss';

class Phonebooks extends Component {
  state = {
    contacts: [...contacts],
    filter: '',
  };

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: newContacts };
    });
  };

  addContact = ({ name, number }) => {
    if (this.isDublicate(name, number)) {
      alert(`${name}: ${number} is already ixist`);
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

  isDublicate(name, number) {
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
    );
  }
}

export default Phonebooks;
