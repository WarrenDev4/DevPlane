'use client';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import './styles/landing.css';

export default function LandingPage() {
  return (
    <div className="landing-wrapper">
      {/* Header Bar */}
      <header className="header">
        <div className="logo-nav">
          <a href="/"><Image src="/DevPlane Logo.png" alt="Logo" width={220} height={60} /></a>
          <nav className="nav">
            <Link href="/login" className="login-button">Login</Link>
            <Link href="/signup" className="signup-button">Sign Up</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="overlay">
          <div className="hero-text">
            <h1 className="fade-in-up" style={{ animationDelay: '0.2s' }}>Empowering developers to be the best they can be.</h1>
            <p className="fade-in-up" style={{ animationDelay: '0.4s' }}>Stay ahead with the latest in tech and development and connect with other developers with DevPlane.</p>
            <Link href="/home" className="fade-in-up explore-button" style={{ animationDelay: '0.6s' }}>Explore Now</Link>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 DevPlane.</p>
      </footer>
    </div>
  );
}

