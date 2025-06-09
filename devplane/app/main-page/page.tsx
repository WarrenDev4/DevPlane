'use client';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="pageWrapper">
            <header className="backgroundNavbar">
                <div className="logo-nav">
                <a href="/main-page"><img src="/DevPlane Logo (White).png" alt="Logo" width={220} height={60}/></a>
                <nav className="nav">
                    <Link href="/login" className="login-button">Login</Link>
                    <Link href="/signup" className="signup-button">Sign Up</Link>
                </nav> 
                </div>
            </header>
        </div>
    );
}