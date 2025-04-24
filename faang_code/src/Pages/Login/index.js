import React, {useState} from 'react';
import './index.css';
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //potentially do it this way for validation later
    // const [values] = useState({
    //     username: '',
    //     password: ''
    // })
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleSubmit= async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Collect form data from individual states
        const formData = {
            username,
            password
        };
        
        //Use fetch-command to send a POST request to backend to verify user
        try {
            const response = await fetch('http://localhost:8081/login', {
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
                console.log("Successful Login!");

                // Store id & username in local storage
                localStorage.setItem("loggedUserId", data.id);
                localStorage.setItem("loggedUsername", data.user.username);
                navigate('/dashboard');  // If successful = Redirect
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Sign In</h1>
            {/* input username, password  */}
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    {/* Input username */}
                    <label>Username: </label>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-field">
                    {/* Input password */}
                    <label>Password: </label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <div className="error">{error}</div>}

                <div className="auth-buttons">
                    <button type="submit" className="login-btn">Login</button>      
                </div>
                    {/*NOTE for later: change to "Link To" and  and import "Link" with "useNavigate"*/}
                <p>Don't have an account? <a href="#/create-account">Create Account</a></p>
            </form>
        </div>
    );
}

export default Login;