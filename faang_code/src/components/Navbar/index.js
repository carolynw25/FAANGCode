import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light">
                <img src="../Images/Gator.png" alt="Image of gator!"/>
                <ul className="navbar-nav d-flex flex-column">
                    <li className="nav-item">
                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/problems" className="nav-link">Problem History</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/settings" className="nav-link">Settings</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/profile" className="nav-link">Profile</Link>
                    </li>
                    <li className="nav-item mt-auto">
                        <Link to="/login" className="nav-link">Sign Out</Link>
                    </li>
                </ul>
            </nav>

        </div>
    );
}

export default Navbar;