import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import '../styles/AssessmentsPage.css';

const AssessmentsPage = () => {
  const [assessmentsData, setAssessmentsData] = useState({});
  const [selectedDate, setSelectedDate] = useState('');

  // Replace with your Google Sheets API key and sheet ID
  const sheetId = '1a8ksEGjlQ5sg6-a8nS7AAk2LS3ZjxF5XJOgOb1GPklM';
      const apiKey = 'AIzaSyDfp9sC09FVbpFLKO9iW65VPneEPvIyIHU';

  useEffect(() => {
    const fetchAssessmentsData = async () => {
      try {
        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet3!A2:D?key=${apiKey}`
        );

        const rows = response.data.values || [];
        const newData = {};

        rows.forEach(row => {
          const [date, title, progress] = row;
          const formattedDate = new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

          if (!newData[formattedDate]) {
            newData[formattedDate] = [];
          }

          newData[formattedDate].push({
            title,
            progress: parseFloat(progress),
          });
        });

        setAssessmentsData(newData);

        // Set default selected date to today
        const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        setSelectedDate(today);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchAssessmentsData();
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="page-wrapper">
      <Sidebar />
      <div className="page-content">
        <div className="tasks-container">
          <div className="tasks-header">
            <h1>My Tasks</h1>
            <p>{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
          </div>

          <div className="date-selector">
            {Object.keys(assessmentsData).map((date) => (
              <div
                key={date}
                className={`date-circle ${selectedDate === date ? 'selected' : ''}`}
                onClick={() => handleDateClick(date)}
              >
                {date}
              </div>
            ))}
          </div>

          <div className="tasks-list">
            {assessmentsData[selectedDate] ? (
              assessmentsData[selectedDate].map((task, index) => (
                <div className="task-item" key={index}>
                  <span className="task-number">{index + 1}</span>
                  <span className="task-title">{task.title}</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${task.progress}%` }}></div>
                  </div>
                </div>
              ))
            ) : (
              <p>No tasks available for the selected date.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentsPage;
