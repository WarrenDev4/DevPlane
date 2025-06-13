import React from 'react';
import TrendingFeed from '../components/TrendingFeed/TrendingFeed';

export default function Trending() {
    return (
        <div className="pageWrapper">
            <header className="backgroundNavbar">
             </header>
                <section className="pageSection">
                    <div className="overlay">
                        <TrendingFeed />    
                        </div>
            </section>
        </div>
    );
}