import React from 'react';
import Sidebar from '../components/Sidebar'; // Import Sidebar component
import '../styles/AssessmentsPage.css'; // Import specific styles for this page

const tasks = [
  { id: 1, title: 'CS201_Assignment_04', progress: 70 },
  { id: 2, title: 'MA301_Assignment_02', progress: 50 },
  { id: 3, title: 'PY101_Assignment_02', progress: 80 },
  { id: 4, title: 'CS302_Assignment_04', progress: 100 },
];

const AssessmentsPage = () => {
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
          <div className="date-circle">12<br/>Monday</div>
          <div className="date-circle">13<br/>Tuesday</div>
          <div className="date-circle selected">14<br/>Today</div>
          <div className="date-circle">15<br/>Thursday</div>
          <div className="date-circle">16<br/>Friday</div>
        </div>
        
        <div className="tasks-list">
          <div className="task-item">
            <span className="task-number">01</span>
            <span className="task-title">CS201_Assignment_04</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '75%' }}></div>
            </div>
          </div>
  
          <div className="task-item">
            <span className="task-number">02</span>
            <span className="task-title">MA301_Assignment_02</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '50%' }}></div>
            </div>
          </div>
  
          <div className="task-item">
            <span className="task-number">03</span>
            <span className="task-title">PY101_Assignment_02</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '30%' }}></div>
            </div>
          </div>
  
          <div className="task-item">
            <span className="task-number">04</span>
            <span className="task-title">CS302_Assignment_04</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '90%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AssessmentsPage;
