// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
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
  );
};

export default Sidebar;
