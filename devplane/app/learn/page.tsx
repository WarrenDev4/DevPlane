import React from 'react';
import Learning from '../components/Learning/Learning';

export default function Learn() {
    return (
        <div className="pageWrapper">
            <header className="backgroundNavbar">
             </header>
                <section className="pageSection">
                    <div className="overlay">
                        <Learning />
                    </div>
            </section>
        </div>
    );
}