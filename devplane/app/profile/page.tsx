import React from 'react';
import ProfilePage from '../../app/components/ProfilePage/ProfilePage';

export default function Profile() {
    return (
        <div className="pageWrapper">
            <header className="backgroundNavbar">
            </header>
            <section className="pageSection">
                <div className="overlay">
                    <ProfilePage />
                </div>
            </section>
        </div>
    );
}