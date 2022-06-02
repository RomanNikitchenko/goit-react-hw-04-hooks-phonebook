import { useState, useEffect } from "react";
import ContactForm from './form/contactForm';
import Filter from './filter/filter';
import ContactList from './contactList/contactList';
import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    //при первой загрузки получаем данные из локального хранилища либо записываем готовый массив контактов(обьектов)
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  });
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    const contactsName = contacts.map(({ name }) =>
      name.toLowerCase()
    );

    contactsName.includes(contact.name.toLowerCase())
      ? alert(`${contact.name} is already in contacts.`)
      : setContacts(prevState => [contact, ...prevState])
  };


  const filterChange = evt => {
    const { value } = evt.target;
    setFilter(value);
  };

  const getFilterChange = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter);
    });
  };


  const deleteContact = Id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== Id));
  };

  // первый раз при загрузки и каждый раз при изменении компонента перезаписываем в локальное хранилище
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);


  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>

      <Filter value={filter} onChange={filterChange} />

      <ContactList
        visibleFilter={getFilterChange()}
        deleteContact={deleteContact}
      />
    </div>
  );

}

export default App;
