import React from 'react';
import ExploreScreen from '../components/ExploreScreen/ExploreScreen';

export default function Explore() {
    return (
        <div className="pageWrapper">
            <header className="backgroundNavbar">
             </header>
                <section className="pageSection">
                    <div className="overlay">
                            <ExploreScreen />
                        </div>
            </section>
        </div>
    );
}