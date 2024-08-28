import React from 'react';
import AttendanceGraph from '../components/AttendanceGraph';
import Calendar from '../components/Calendar';
import '../styles/HomePage.css';
import bannerImage from '../assets/vector.png'; 

const HomePage = () => {
  const overallAttendance = [80, 20]; // Example data
  const subjectAttendance = {
    PY101: [87.5, 12.5],
    CH203: [75, 25],
    MA301: [87.5, 12.5],
    CS201: [93.51, 6.49],
    
  };

  return (
    <div className="home-wrapper">
      <div className="sidebar">
        <div className="sidebar-item current">Dashboard</div>
        <div className="sidebar-item">Schedule</div>
        <div className="sidebar-item">Assessments</div>
        <div className="sidebar-item">Contacts</div>
      </div>

      <div className="home-container">
        <div className="left-section">
          <div className="greeting-box">
            <h2>Hey, Harshita!</h2>
            <p>You have 1 new assessment to do.<div><a href="#explore">Explore &gt;&gt;</a></div></p>
            <img src={bannerImage} alt="Banner" className="banner-image" />
          </div>
          <div className="attendance-box">
            <div className="overall-attendance">
              <AttendanceGraph data={overallAttendance} label="Overall Attendance" />
            </div>
           
            <div className="subject-attendance-box">
              {Object.keys(subjectAttendance).map(subject => (
                <AttendanceGraph 
                  key={subject} 
                  data={subjectAttendance[subject]} 
                  label={`Attendance for ${subject}`} 
                />
              ))}
            </div>
          </div>
          
        </div>
        <div className="right-section">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
