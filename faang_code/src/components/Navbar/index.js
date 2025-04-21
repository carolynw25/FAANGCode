import React from 'react';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const storedUsername = localStorage.getItem('loggedUsername'); // check login status


    const Logout = () => {
        localStorage.removeItem('loggedUsername');
        navigate('/login');
    };

    const LoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light">
                <Link to="/">
                    <img src="../Images/Gator.png" alt="Image of gator!"/>
                </Link>
                <ul className="navbar-nav d-flex flex-column nav-content">
                <div className="nav-links">
                    <li className="nav-item">
                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link to="/problems" className="nav-link">Problem History</Link>
                    </li> */}
                    <li className="nav-item">
                        <Link to="/profile" className="nav-link">Profile</Link>
                    </li>
                    </div>
                    <div className="nav-bottom">
                    <li className="nav-item logout-item">
                        {/* javascript if else */}
                        {storedUsername ? (
                            <button className="nav-link logout-button" onClick={Logout}>Sign Out</button>
                        ) : (
                            <button className="nav-link logout-button" onClick={LoginRedirect}>Sign In</button>
                        )}
                    </li>
                    </div>
                </ul>
            </nav>

        </div>
    );
}

export default Navbar;