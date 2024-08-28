import React, { useState, useEffect } from 'react';
import '../styles/Calendar.css';

const Calendar = () => {
  const [nextDayClasses, setNextDayClasses] = useState([]);
  const [nextDay, setNextDay] = useState('');

  useEffect(() => {
    const fetchScheduleData = async () => {
      const sheetId = '1a8ksEGjlQ5sg6-a8nS7AAk2LS3ZjxF5XJOgOb1GPklM';
      const apiKey = 'AIzaSyDfp9sC09FVbpFLKO9iW65VPneEPvIyIHU';
      const range = 'Sheet2!A2:E'; // Adjust the sheet name and range as needed

      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        if (!data.values) {
          throw new Error('No data found in the spreadsheet.');
        }

        const rows = data.values;
        const days = ["MON", "TUE", "WED", "THURS", "FRI"];
        
        // Get the current day and calculate the next day
        const currentDate = new Date();
        const currentDayIndex = currentDate.getDay(); // 0 (Sun) to 6 (Sat)
        const dayMap = { 0: "SUN", 1: "MON", 2: "TUE", 3: "WED", 4: "THURS", 5: "FRI", 6: "SAT" };
        let nextDayIndex = (currentDayIndex + 1) % 7; // 0 (Sun) to 6 (Sat)
        let nextDayName = dayMap[nextDayIndex];
        
        if (nextDayName === "SUN") nextDayName = "MON"; // Handle weekend transition
        if (nextDayName === "SAT") nextDayName = "MON"; // Handle weekend transition

        setNextDay(nextDayName);

        const nextDayClasses = rows.filter(row => row[0] === nextDayName).map(row => ({
          time: row[1],
          subject: row[2],
          room: row[3],
          professor: row[4]
        }));

        setNextDayClasses(nextDayClasses);
      } catch (error) {
        console.error('Error fetching schedule data:', error.message);
      }
    };

    fetchScheduleData();
  }, []);

  return (
    <div className="calendar-container">
      <h3>Classes for Tomorrow ({nextDay})</h3>
      <div className="class-list">
        {nextDayClasses.length > 0 ? (
          nextDayClasses.map((classItem, index) => (
            <div className="class-item" key={index}>
              <div className="class-info">
                {classItem.time} - {classItem.subject}
                <span className="class-day">({nextDay})</span>
              </div>
              <div className="class-professor">
                Professor: {classItem.professor}
              </div>
            </div>
          ))
        ) : (
          <p>No classes scheduled for tomorrow.</p>
        )}
      </div>
    </div>
  );
};

export default Calendar;
