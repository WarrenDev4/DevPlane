'use client';

import Image from 'next/image';
import React from 'react';
import './styles/landing.css';

export default function LandingPage() {
  return (
    <div className="landing-wrapper">
      {/* Header Bar */}
      <header className="header">
        <div className="logo-nav">
          <Image src="/DevPlane Logo.png" alt="Logo" width={220} height={60} />
          <nav className="nav">
            <a href="/login" className="login-button">Login</a>
            <a href="/signup" className="signup-button">Sign Up</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="overlay">
          <div className="hero-text">
            <h1>Empowering developers to be the best they can be.</h1>
            <p>Stay ahead with the latest in tech and development and connect with other developers with DevPlane.</p>
            <a href="/explore" className="explore-button">Explore Now</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 DevPlane.</p>
      </footer>
    </div>
  );
}

