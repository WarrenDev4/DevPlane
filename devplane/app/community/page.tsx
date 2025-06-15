import React from 'react';
import CommunityPage from '../../app/components/CommunityPage/CommunityPage';

export default function Profile() {
    return (
        <div className="pageWrapper">
            <header className="backgroundNavbar">
            </header>
            <section className="pageSection">
                <div className="overlay">
                    <CommunityPage />
                </div>
            </section>
        </div>
    );
}