import React from 'react';
import AppCard from '@/app/components/AppCard/AppCard';

export default function Home() {
    return (
        <div className="pageWrapper">
            <header className="backgroundNavbar">
            </header>
            <section className="pageSection">
                <div className="overlay">
                    <AppCard />
                </div>
            </section>
        </div>
    );
}