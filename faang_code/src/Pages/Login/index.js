import React, {useState} from 'react';
import './index.css';
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //should we have them login via email or username?

    //Use fetch-command to send a POST request

    return (
        <div>
            <h1>Sign In</h1>
            {/* input username, password  */}

            <div>
                {/* Input username */}
                <label>Username: </label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                {/* Input password */}
                <label>Password: </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <div className="auth-buttons">
                <button onClick={() => navigate('/dashboard')} className="login-btn">Login</button>
            </div>
        </div>
    );
}

export default Login;