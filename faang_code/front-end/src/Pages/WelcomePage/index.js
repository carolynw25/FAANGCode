import React from "react";
import {useNavigate} from "react-router-dom";
import './index.css';

function WelcomePage() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1>Welcome to FAANGCode!</h1>
            <p>Track your coding progress, get hints, and improve your problem-solving skills.</p>
            <div className="auth-buttons">
                <button onClick={() => navigate('/login')} className="login-btn">Login</button>
                <button onClick={() => navigate('/create-account')} className="signup-btn">Sign Up</button>
            </div>
        </div>
    );
}

export default WelcomePage;