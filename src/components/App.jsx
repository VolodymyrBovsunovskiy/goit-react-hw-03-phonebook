import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import { Wrapper } from './Wrapper/Wrapper';
import { LOCAL_STORAGE_KEY } from 'helpers/localStorageKey';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const contactsFromLocalStorage =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? [];
    this.setState({
      contacts: contactsFromLocalStorage,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts.length !== prevState.contacts.length) {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(this.state.contacts)
      );
    }
  }

  handleAddContact = userContacts => {
    if (
      this.state.contacts.some(
        contact =>
          contact.name.toLowerCase() === userContacts.name.toLowerCase()
      )
    ) {
      alert(`${userContacts.name} is already in contacts`);
      return;
    }
    this.setState({
      contacts: [userContacts, ...this.state.contacts],
    });
  };

  handleFilterChange = e => {
    this.setState({
      filter: e.target.value,
    });
  };
  getContactFromFilter = () => {
    const { contacts, filter } = this.state;
    const filterContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
    return filterContacts;
  };
  handleDelete = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };

  render() {
    return (
      <Wrapper>
        <h1>Phonebook</h1>
        <ContactForm handleAddContact={this.handleAddContact} />
        <h2>Contacts</h2>
        <Filter
          filter={this.filter}
          handleFilterChange={this.handleFilterChange}
        />
        <ContactsList
          contacts={this.getContactFromFilter()}
          handleDelete={this.handleDelete}
        />
      </Wrapper>
    );
  }
}
