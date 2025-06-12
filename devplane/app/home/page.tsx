import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import AppCard from '@/app/components/AppCard/AppCard';

export default function Home() {
    return (
        <div className="pageWrapper">
            <header className="backgroundNavbar">
            </header>

            {/* Hero Section */}
            <section className="pageSection">
                <div className="overlay">
                    <AppCard />
                </div>
            </section>
        </div>
    );
}