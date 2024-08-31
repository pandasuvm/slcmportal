import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import AttendanceGraph from '../components/AttendanceGraph';
import Calendar from '../components/Calendar';
import Sidebar from '../components/Sidebar';
import '../styles/HomePage.css';
import bannerImage from '../assets/vector.png';
import { auth } from '../firebase/config'; // Import Firebase auth

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [overallAttendance, setOverallAttendance] = useState([0, 0]);
  const [subjectAttendance, setSubjectAttendance] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      const sheetId = '1a8ksEGjlQ5sg6-a8nS7AAk2LS3ZjxF5XJOgOb1GPklM';
      const apiKey = 'AIzaSyDfp9sC09FVbpFLKO9iW65VPneEPvIyIHU';
      const range = 'Sheet1!A2:C';

      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.values) {
          throw new Error('No data found in the spreadsheet.');
        }

        const rows = data.values;

        const newOverallAttendance = [0, 0];
        const newSubjectAttendance = {};

        rows.forEach((row) => {
          if (row[0]) {
            newSubjectAttendance[row[0]] = [
              parseFloat(row[1]),
              parseFloat(row[2]),
            ];
            newOverallAttendance[0] += parseFloat(row[1]);
            newOverallAttendance[1] += parseFloat(row[2]);
          }
        });

        const total = newOverallAttendance[0] + newOverallAttendance[1];
        setOverallAttendance([
          ((newOverallAttendance[0] / total) * 100).toFixed(2),
          ((newOverallAttendance[1] / total) * 100).toFixed(2),
        ]);

        setSubjectAttendance(newSubjectAttendance);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchAttendanceData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Log out the user
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  return (
    <div className="home-wrapper">
      <Sidebar />
      <div className="home-container">
        <div className="left-section">
          <div className="greeting-box">
            <h2>Hey, {user?.displayName || 'User'}!</h2>
            <p>
              You have 1 new assessment to do.
              <div>
                <Link to="/assessments">Explore &gt;&gt;</Link>
              </div>
            </p>
            <img src={bannerImage} alt="Banner" className="banner-image" />
          </div>
          <div className="attendance-box">
            <div className="overall-attendance">
              <AttendanceGraph data={overallAttendance} label="Overall Attendance" />
            </div>
            <div className="subject-attendance-container">
              <div className="subject-attendance-box">
                {Object.keys(subjectAttendance).map((subject) => {
                  const attendance = subjectAttendance[subject];
                  const total = attendance[0] + attendance[1];
                  const percentage = ((attendance[0] / total) * 100).toFixed(2);
                  return (
                    <div key={subject} className="subject-progress">
                      <h4>{subject}</h4>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: percentage < 75 ? '#e74c3c' : '#2ecc71',
                          }}
                        ></div>
                      </div>
                      <p>{percentage}% Present</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="right-section">
          <Calendar />
          <button onClick={handleLogout} className="login-button">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
