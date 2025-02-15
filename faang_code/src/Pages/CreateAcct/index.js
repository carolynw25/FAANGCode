import React, { useState } from "react";
import './index.css';
import {useNavigate} from "react-router-dom";

function CreateAcct() {
    const navigate = useNavigate();

    //store different states for user->may need to collab w/ back-end database
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    //code to fetch/post request from database here

    //loading/error state defs
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit= async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Collect form data from individual states
        const formData = {
            firstName,
            lastName,
            username,
            password,
            email
        };

        try {
            const response = await fetch('http://localhost:3000/create-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log("Response:", response); // Log full response
            console.log("Data:", data); // Log response body data

            if (response.ok) {
                console.log("Successful registration!");
                navigate('/login');  // Redirect on success
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }


    return (
        <div>
            <h1>Create an Account</h1>
            {/* input firstname, lastname, username, email, password, etc */}
            <form action= "" onSubmit={handleSubmit}>
                <div>
                    {/* Input user's first name */}
                    <label>First Name: </label>
                    <input
                        type="text"
                        placeholder="Enter First Name"
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
                        placeholder="Enter Last Name"
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
                        placeholder="Enter Email"
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
                        placeholder="Username"
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
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* button to create an acct->change this later to be a submit form */}
                <div className="auth-buttons">
                    <button type="submit" className="signup-btn">Sign Up</button>
                </div>

                <p> Already have an account?</p>
                <button onClick={() => navigate('/login')}> Login </button>

            </form>
        </div>
    );
}

export default CreateAcct;