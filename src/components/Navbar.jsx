// src/components/Navbar.jsx
import React from 'react';
import './Navbar.css'; // We'll create this CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>SLCM Portal</h2>
      </div>
      <ul className="navbar-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Attendance</a></li>
        <li><a href="#">Timetable</a></li>
        <li><a href="#">Profile</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
