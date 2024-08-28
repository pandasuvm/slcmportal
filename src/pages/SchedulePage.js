import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'; // Assuming you already have this component
import '../styles/SchedulePage.css'; // New CSS file for the schedule page styles

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM"];

const SchedulePage = () => {
  const [classes, setClasses] = useState({});
  const [hoveredClass, setHoveredClass] = useState(null);

  useEffect(() => {
    // Replace with your Google Sheets API URL
    const fetchScheduleData = async () => {
      try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1a8ksEGjlQ5sg6-a8nS7AAk2LS3ZjxF5XJOgOb1GPklM/values/Sheet2!A2:E?key=AIzaSyDfp9sC09FVbpFLKO9iW65VPneEPvIyIHU`);
        const data = await response.json();
        const scheduleData = {};

        data.values.forEach(row => {
          const [day, time, subject, room, professor] = row;
          if (!scheduleData[day]) {
            scheduleData[day] = [];
          }
          scheduleData[day].push({ time, subject, room, professor });
        });

        setClasses(scheduleData);
      } catch (error) {
        console.error('Error fetching schedule data:', error);
      }
    };

    fetchScheduleData();
  }, []);

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
                    const classInfo = classes[day]?.find(
                      (cls) => cls.time === time
                    );
                    const isHovered = hoveredClass && hoveredClass.day === day && hoveredClass.index === index;
                    const displayText = isHovered && classInfo ? classInfo.professor : classInfo ? `${classInfo.subject} (${classInfo.room})` : '';

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
