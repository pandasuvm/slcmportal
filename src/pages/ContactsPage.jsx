import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/ContactsPage.css'; // Contacts specific styling

const sheetId = '1a8ksEGjlQ5sg6-a8nS7AAk2LS3ZjxF5XJOgOb1GPklM';
      const apiKey = 'AIzaSyDfp9sC09FVbpFLKO9iW65VPneEPvIyIHU';
      const range = 'Sheet4!A2:E';    // Adjust the range if needed

const ContactsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    const fetchContactsData = async () => {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.values) {
          throw new Error('No data found in the spreadsheet.');
        }

        const [ ...rows] = data.values;
        const contactsList = rows.map(row => ({
          name: row[0],
          phone: row[1],
          email: row[2],
          specialization: row[3],
          avatar: row[4],
        }));

        setContacts(contactsList);
        setFilteredContacts(contactsList);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchContactsData();
  }, []);

  // Handle search input
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(value) ||
      contact.phone.toLowerCase().includes(value) ||
      contact.email.toLowerCase().includes(value) ||
      contact.specialization.toLowerCase().includes(value)
    );
    
    setFilteredContacts(filtered);
  };

  return (
    <div className="page-wrapper">
      <Sidebar />
      <div className="page-content">
        <h1 className="heading">Contacts</h1>
        
        {/* Search Input */}
        <div className="search-filter">
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm} 
            onChange={handleSearch} 
            className="search-input"
          />
        </div>
        
        <div className="contacts-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>E-Mail</th>
                <th>Specialization</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact, index) => (
                <tr key={index}>
                  <td>
                    <div className="contact-info">
                      <img src={contact.avatar} alt={contact.name} className="avatar" />
                      <span>{contact.name}</span>
                    </div>
                  </td>
                  <td>{contact.phone}</td>
                  <td>{contact.email}</td>
                  <td>{contact.specialization}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
