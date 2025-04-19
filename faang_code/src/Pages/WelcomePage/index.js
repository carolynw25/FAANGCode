import React from "react";
import './index.css';


function WelcomePage() {

    return (
        <div className="home-container">
            <h1 className="welcome">Welcome to FAANGCode!</h1>
            <p className="intro-text">
                <strong>Track your coding progress, get hints, and improve your problem-solving skills.</strong>
            </p>

            <section className="section-card">
                <h2>About FAANGCode</h2>
                <p>
                    FAANGCode is an AI-powered Chrome extension and website designed to help programmers enhance their
                    coding skills and efficiently prepare for technical interviews. Our extension monitors users'
                    LeetCode progress,
                    recommends optimal problems, and provides AI-driven hints that guide users without spoiling the
                    solution, ensuring effective learning.
                </p>
                <p>
                    Our platform also includes a website with interactive charts to track your progress.
                    By bridging the gap between academic learning and real-world coding challenges, FAANGCode empowers
                    you to improve your skills and boost your chances of landing jobs at top tech companies.
                </p>
            </section>

            <section className="section-card">
                <h2>Our Mission</h2>
                <p>
                    Our goal is to help programmers secure employment at top technology firms.
                    Many companies now require solving complex programming challenges during interviews.
                    FAANGCode helps you build the confidence and skillset needed to tackle those problems with ease.
                </p>
            </section>

            <section className="section-card">
                <h2>About Us</h2>
                <p>
                    Hello, we’re the team of passionate computer science students behind <strong>FAANGCode</strong> —
                    Alan Wang, Sam Chen, Carolyn Wang, and Erin Hargrave.
                    With backgrounds in full-stack development, AI, and UX, we’ve come together to create a platform
                    that bridges the gap between practice and performance.
                </p>
            </section>
            <img src="/images/faang_pic.png" alt="FAANGCode Logo" className="faang-image"/>
        </div>
    );
}

export default WelcomePage;