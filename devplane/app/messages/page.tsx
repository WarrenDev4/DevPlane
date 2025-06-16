import React from 'react';
import MessagePage from '../components/MessagePage/MessagePage';

export default function Messages() {
    return (
        <div className="pageWrapper">
            <header className="backgroundNavbar">
             </header>
                <section className="pageSection">
                    <div className="overlay">
                            <MessagePage />
                        </div>
            </section>
        </div>
    );
}