// src/pages/Login.js
import React, { useState, useEffect } from 'react';
import GoogleLoginButton from '../components/Auth/GoogleLoginButton';
import EmailLoginForm from '../components/Auth/EmailLoginForm';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import '../styles/LoginPage.css';

const Login = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/'); // Redirect to home if already authenticated
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <GoogleLoginButton />
      <EmailLoginForm />
      <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
    </div>
  );
};

export default Login;
