import React from 'react';
import '../styles/ProgressBar.css';

const ProgressBar = ({ subject, attendance }) => {
  const [presentDays, absentDays] = attendance;
  const totalDays = presentDays + absentDays;
  const presentPercentage = ((presentDays / totalDays) * 100).toFixed(2);
  const absentPercentage = ((absentDays / totalDays) * 100).toFixed(2);

  return (
    <div className="progress-bar-wrapper">
      <div className="progress-bar-label">
        {subject}
      </div>
      <div className="progress-bar" title={`Present: ${presentPercentage}%, Absent: ${absentPercentage}%`}>
        <div className="progress-bar-present" style={{ width: `${presentPercentage}%` }}>
          <span className="progress-bar-tooltip">{`${presentPercentage}%`}</span>
        </div>
        <div className="progress-bar-absent" style={{ width: `${absentPercentage}%` }}>
          <span className="progress-bar-tooltip">{`${absentPercentage}%`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
