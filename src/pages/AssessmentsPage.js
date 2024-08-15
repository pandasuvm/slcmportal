import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; // Import Sidebar component
import '../styles/AssessmentsPage.css'; // Import specific styles for this page

const assessmentsData = {
  "12-Monday": [
    { id: 1, title: 'CS201_Assignment_03', progress: 60 },
    { id: 2, title: 'MA301_Assignment_01', progress: 40 },
  ],
  "13-Tuesday": [
    { id: 3, title: 'PY101_Assignment_01', progress: 50 },
  ],
  "14-Today": [
    { id: 4, title: 'CS201_Assignment_04', progress: 75 },
    { id: 5, title: 'MA301_Assignment_02', progress: 50 },
    { id: 6, title: 'PY101_Assignment_02', progress: 30 },
    { id: 7, title: 'CS302_Assignment_04', progress: 90 },
  ],
  "15-Thursday": [
    { id: 8, title: 'CS201_Assignment_05', progress: 20 },
  ],
  "16-Friday": [
    { id: 9, title: 'MA301_Assignment_03', progress: 90 },
  ],
};

const AssessmentsPage = () => {
  const [selectedDate, setSelectedDate] = useState('14-Today');

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
            <p>Sept 2024</p>
          </div>
          
          <div className="date-selector">
            {Object.keys(assessmentsData).map((date) => (
              <div
                key={date}
                className={`date-circle ${selectedDate === date ? 'selected' : ''}`}
                onClick={() => handleDateClick(date)}
              >
                {date.split('-')[0]}<br/>{date.split('-')[1]}
              </div>
            ))}
          </div>
          
          <div className="tasks-list">
            {assessmentsData[selectedDate].map((task, index) => (
              <div className="task-item" key={task.id}>
                <span className="task-number">{index + 1}</span>
                <span className="task-title">{task.title}</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${task.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentsPage;
