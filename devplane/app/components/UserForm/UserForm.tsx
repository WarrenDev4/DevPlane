'use client';

import React, { useState } from 'react';
import styles from './UserForm.module.css';

export default function UserForm({ type }: { type: 'login' | 'signup' }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.leftPanel}>
        <div className={styles.logo}>
          <img src="/DevPlane Logo.png" alt="Logo" width={220} height={60} />
        </div>

        <div className={`${styles.formWrapper} ${styles.fade}`}>
          <h2 className={styles.signText}>
            {type === 'signup' ? 'Sign Up to DevPlane' : 'Sign in to DevPlane'}
            </h2>

          <form className={styles.form} onSubmit={handleSubmit}>
            {type === 'signup' && (
              <>
                <label className={styles.formLabel}>
                  First Name
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    required
                  />
                </label>

                <label className={styles.formLabel}>
                  Last Name
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    required
                  />
                </label>
              </>
            )}

            <label className={styles.formLabel}>
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </label>

            <label className={styles.formLabel}>
              Password
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="●●●●●●●●"
                required
              />
            </label>

            <button type="submit" className={styles.submitButton}>
              {type === 'signup' ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

        <p className={styles.footerText}>
          {type === 'signup' ? (
            <>Have an account? <a href="/login">Sign in</a></>
              ) : (
            <>
              Don’t have an account? <a href="/signup">Sign up</a><br />
            <a href="/forgotpassword">Forgot password?</a>
              </>
            )}
          </p>
        </div>
      </div>

      <div className={styles.rightPanel}></div>
    </div>
  );
}
