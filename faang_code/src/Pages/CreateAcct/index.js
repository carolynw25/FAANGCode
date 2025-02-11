import React, { useState } from "react";
import './index.css';
import {useNavigate} from "react-router-dom";

function CreateAcct() {
    const navigate = useNavigate();

    //store different states for user->may need to collab w/ back-end database
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //code to fetch/post request from database here

    return (
        <div>
            <h1>Create an Account</h1>
            {/* input firstname, lastname, username, email, password, etc */}

            <div>
                {/* Input user's first name */}
                <label>First Name: </label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
            </div>

            <div>
                {/* Input user's last name */}
                <label>Last Name: </label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </div>

            <div>
                {/* Input user's email */}
                <label>Email: </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div>
                {/* Input user's username */}
                <label>Username: </label>
                <input
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>

            <div>
                {/* Input user's password-make sure to hash/encrypt in database */}
                <label>Password: </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            {/* button to create an acct->change this later to be a submit form */}
            <div className="auth-buttons">
                <button onClick={() => navigate('/dashboard')} className="signup-btn">Sign Up</button>
            </div>
        </div>
    );
}

export default CreateAcct;