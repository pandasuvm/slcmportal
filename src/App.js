// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import AssessmentsPage from './pages/AssessmentsPage';
import ContactsPage from './pages/ContactsPage';
import Login from './pages/Login'; // Import the Login page
import ForgotPassword from './pages/ForgotPassword'; // Import Forgot Password page
import { auth } from './firebase/config'; // Import Firebase auth
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Set loading to false when auth state is resolved
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while checking authentication
  }

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Forgot Password Route */}

          {/* Private routes */}
          <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/schedule" element={user ? <SchedulePage /> : <Navigate to="/login" />} />
          <Route path="/assessments" element={user ? <AssessmentsPage /> : <Navigate to="/login" />} />
          <Route path="/contacts" element={user ? <ContactsPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
