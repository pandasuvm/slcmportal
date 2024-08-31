// src/components/Auth/EmailLoginForm.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';


const EmailLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      const userCredential = isRegistering 
        ? await createUserWithEmailAndPassword(auth, email, password) 
        : await signInWithEmailAndPassword(auth, email, password);
      console.log('User:', userCredential.user);
    } catch (error) {
      setError(error.message);
      console.error("Error during email login:", error);
    }
  };

  return (
    <div>
      <h3>{isRegistering ? "Register" : "Login"} with Email</h3>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">
          {isRegistering ? "Register" : "Login"}
        </button>
      </form>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Already have an account? Login" : "Create an account"}
      </button>
      
      {/* Show Password Reset Form only when not registering */}
    
    </div>
  );
};

export default EmailLoginForm;
