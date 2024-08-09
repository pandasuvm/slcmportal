import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Timetable = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div style={{ margin: '20px' }}>
      <h3>Timetable</h3>
      <Calendar onChange={setDate} value={date} />
      <div style={{ marginTop: '20px' }}>
        {/* Example timetable display */}
        <p><strong>{date.toDateString()}</strong></p>
        <p>10:00 AM - 11:00 AM: Math</p>
        <p>11:15 AM - 12:15 PM: Science</p>
        <p>1:00 PM - 2:00 PM: History</p>
      </div>
    </div>
  );
};

export default Timetable;
