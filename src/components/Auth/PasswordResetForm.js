// src/components/Auth/PasswordResetForm.js
import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/config';

const PasswordResetForm = () => {
  const [resetEmail, setResetEmail] = useState('');
  const [error, setError] = useState(null);
  const [resetSent, setResetSent] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetSent(true);
    } catch (error) {
      setError(error.message);
      console.error("Error during password reset:", error);
    }
  };

  return (
    <div>
      <h4>Forgot Password?</h4>
      <form onSubmit={handlePasswordReset}>
        <input 
          type="email" 
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">
          Reset Password
        </button>
      </form>
      {resetSent && <p>A password reset email has been sent to {resetEmail}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PasswordResetForm;
