import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import AssessmentsPage from './pages/AssessmentsPage';
import ContactsPage from './pages/ContactsPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/assessments" element={<AssessmentsPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
