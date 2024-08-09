import React from 'react';
import '../styles/Calendar.css';

const Calendar = () => {
  return (
    <div className="calendar-container">
      <h3>Classes for Tomorrow</h3>
      <div className="class-list">
        <div className="class-item">9AM - PY101</div>
        <div className="class-item">11AM - CH203</div>
        <div className="class-item">1PM - MA301</div>
        <div className="class-item">2PM - CS201</div>
      </div>
    </div>
  );
};

export default Calendar;
