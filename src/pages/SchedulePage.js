import React from 'react';
import Sidebar from '../components/Sidebar'; // Assuming you already have this component
import '../styles/SchedulePage.css'; // New CSS file for the schedule page styles

const SchedulePage = () => {
  return (
    <div className="page-wrapper">
      <Sidebar />
      <div className="page-content">
        <div className="schedule-container">
          <table className="schedule-table">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="day">MON</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>

              </tr>
              <tr>
                <td className="day">TUE</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td className="day">WED</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td className="day">THURS</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td className="day">FRI</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
