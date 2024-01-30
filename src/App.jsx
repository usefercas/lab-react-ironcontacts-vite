import React, { useState, useEffect } from 'react';
import './App.css';
import contactsData from "./contacts.json";

function App() {
  const [shownContacts, setShownContacts] = useState([]);
  const [sortingCriteria, setSortingCriteria] = useState(null);

  const sortContactsByName = () => {
    const sortedContacts = [...shownContacts].sort((a, b) => a.name.localeCompare(b.name));
    setShownContacts(sortedContacts);
    setSortingCriteria('name');
  };

  const sortContactsByPopularity = () => {
    const sortedContacts = [...shownContacts].sort((a, b) => b.popularity - a.popularity);
    setShownContacts(sortedContacts);
    setSortingCriteria('popularity');
  };

  const addRandomContact = () => {
    const remainingContacts = contactsData.filter(contact => !shownContacts.includes(contact));
    if (remainingContacts.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingContacts.length);
      const newContact = remainingContacts[randomIndex];
      setShownContacts(prevContacts => [...prevContacts, newContact]);
    }
  };

  const deleteContact = (id) => {
    const updatedContacts = shownContacts.filter(contact => contact.id !== id);
    setShownContacts(updatedContacts);
  };

  useEffect(() => {
    const initialContacts = contactsData.slice(0, 5);
    setShownContacts(initialContacts);
  }, []);

  return (
    <div className="App">
      <h1 className="heading">React IronContacts</h1>
      <div className="button-container">
        <button className="button" onClick={sortContactsByName}>Ordenar por nombre</button>
        <button className="button" onClick={sortContactsByPopularity}>Ordenar por popularidad</button>
        <button className="button" onClick={addRandomContact}>Agregar contacto aleatorio</button>
      </div>
      <table className="contact-table">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Ganó un Oscar</th>
            <th>Ganó un Emmy</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {shownContacts.map(contact => (
            <tr key={contact.id}>
              <td><img src={contact.pictureUrl} alt={contact.name} className="contact-image" /></td>
              <td>{contact.name}</td>
              <td>{contact.popularity}</td>
              <td>{contact.wonOscar ? '🏆' : null}</td>
              <td>{contact.wonEmmy ? '🌟' : null}</td>
              <td><button className="delete-button" onClick={() => deleteContact(contact.id)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
