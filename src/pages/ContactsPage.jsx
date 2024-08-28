import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/ContactsPage.css'; // Contacts specific styling

const contactsData = [
  { avatar: 'https://cdn-icons-png.flaticon.com/512/2922/2922510.png', name: 'John Doe', phone: '+91-9876543212', email: 'john.doe@rgipt.ac.in', specialization: 'AI-ML' },
  { avatar: 'https://cdn-icons-png.flaticon.com/512/2922/2922510.png', name: 'Jane Smith', phone: '+91-9876543212', email: 'jane.smith@rgipt.ac.in', specialization: 'Data Science' },
  { avatar: 'https://cdn-icons-png.flaticon.com/512/2922/2922510.png', name: 'Michael Brown', phone: '+91-9876543212', email: 'michael.brown@rgipt.ac.in', specialization: 'Cyber Security' },
  { avatar: 'https://cdn-icons-png.flaticon.com/512/2922/2922510.png', name: 'Emily Davis', phone: '+91-9876543212', email: 'emily.davis@rgipt.ac.in', specialization: 'Web Development' },
  { avatar: 'https://cdn-icons-png.flaticon.com/512/2922/2922510.png', name: 'David Wilson', phone: '+91-9876543212', email: 'david.wilson@rgipt.ac.in', specialization: 'AI-ML' },
  { avatar: 'https://cdn-icons-png.flaticon.com/512/2922/2922510.png', name: 'Sophia Johnson', phone: '+91-9876543212', email: 'sophia.johnson@rgipt.ac.in', specialization: 'Data Science' },
  { avatar: 'https://cdn-icons-png.flaticon.com/512/2922/2922510.png', name: 'James Williams', phone: '+91-9876543212', email: 'james.williams@rgipt.ac.in', specialization: 'Cyber Security' },
  { avatar: 'https://cdn-icons-png.flaticon.com/512/2922/2922510.png', name: 'Olivia Martinez', phone: '+91-9876543212', email: 'olivia.martinez@rgipt.ac.in', specialization: 'Web Development' },
];

const ContactsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(contactsData);

  // Handle search input
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = contactsData.filter(contact =>
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
