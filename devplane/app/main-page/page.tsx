'use client';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="wrapper">
      {/* Navigation Bar */}
      <header className="navbar">
        <div className="logo">
          <Image src="/DevPlane Logo (White).png" alt="Logo" width={220} height={60} />
        </div>
      </header>
    </div>
  );
}