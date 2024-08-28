import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; // Assuming you already have this component
import '../styles/SchedulePage.css'; // New CSS file for the schedule page styles

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM"];
const classes = {
  "MON": [
    { time: "9:00 AM", subject: "CS201", room: "Room 101" },
    { time: "11:00 AM", subject: "MA301", room: "Room 202" },
  ],
  "TUE": [
    { time: "10:00 AM", subject: "PY101", room: "Room 103" },
    { time: "2:00 PM", subject: "CS302", room: "Room 101" },
  ],
  "WED": [
    { time: "11:00 AM", subject: "MA301", room: "Room 202" },
    { time: "1:00 PM", subject: "CS201", room: "Room 101" },
  ],
  "THURS": [
    { time: "9:00 AM", subject: "CS302", room: "Room 101" },
  ],
  "FRI": [
    { time: "10:00 AM", subject: "PY101", room: "Room 103" },
    { time: "1:00 PM", subject: "CS201", room: "Room 101" },
  ],
};

const professors = ["Prof. A. Smith", "Dr. B. Johnson", "Prof. C. Lee", "Dr. D. Patel"];

const SchedulePage = () => {
  const [hoveredClass, setHoveredClass] = useState(null);

  const handleMouseEnter = (day, index) => {
    setHoveredClass({ day, index });
  };

  const handleMouseLeave = () => {
    setHoveredClass(null);
  };

  return (
    <div className="page-wrapper">
      <Sidebar />
      <div className="page-content">
        <div className="schedule-container">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Day</th>
                {timeSlots.map((time, index) => (
                  <th key={index}>{time}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(classes).map((day) => (
                <tr key={day}>
                  <td className="day">{day}</td>
                  {timeSlots.map((time, index) => {
                    const classInfo = classes[day].find(
                      (cls) => cls.time === time
                    );
                    const isHovered = hoveredClass && hoveredClass.day === day && hoveredClass.index === index;
                    const displayText = isHovered ? professors[Math.floor(Math.random() * professors.length)] : classInfo ? `${classInfo.subject} (${classInfo.room})` : '';

                    return (
                      <td
                        key={index}
                        onMouseEnter={() => handleMouseEnter(day, index)}
                        onMouseLeave={handleMouseLeave}
                        className={classInfo ? 'has-class' : ''}
                      >
                        {classInfo && (
                          <div className="class-info">
                            {displayText}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
