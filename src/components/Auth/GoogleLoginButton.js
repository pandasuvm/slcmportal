// src/components/Auth/GoogleLoginButton.js
import React from 'react';
import { auth, googleProvider } from '../../firebase/config'; // Correct import
import { signInWithPopup } from 'firebase/auth';

const GoogleLoginButton = () => {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider); // Use googleProvider
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  return (
    <button onClick={handleGoogleLogin} className="google-login-button">
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;
