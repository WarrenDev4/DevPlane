'use client';

import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useState } from 'react';
import styles from '../components/UserForm/UserForm.module.css'; 
import React from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent!');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.leftPanel}>
        <div className={styles.logo}>
          <img src="/DevPlane Logo.png" alt="Logo" width={220} height={60} />
        </div>

        <div className={styles.formWrapper}>
          <h2 className={styles.signText}>Reset Your Password</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label>Email Address
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <button type="submit">Send Reset Link</button>
          </form>
          <p className={styles.footerText}>
            Remembered your password? <a href="/login">Sign in</a>
          </p>
        </div>
      </div>
      <div className={styles.rightPanel}></div>
    </div>
  );
}
