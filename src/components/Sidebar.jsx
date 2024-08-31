import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <FaBars className="menu-icon" onClick={toggleSidebar} />
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <NavLink to="/" exact className="sidebar-item" activeClassName="current">
          Dashboard
        </NavLink>
        <NavLink to="/schedule" className="sidebar-item" activeClassName="current">
          Schedule
        </NavLink>
        <NavLink to="/assessments" className="sidebar-item" activeClassName="current">
          Assessments
        </NavLink>
        <NavLink to="/contacts" className="sidebar-item" activeClassName="current">
          Contacts
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;
