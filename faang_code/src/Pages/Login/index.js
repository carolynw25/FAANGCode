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
    const handleSubmit=(event) => {
        event.preventDefault();
    }

    //Use fetch-command to send a POST request

    return (
        <div>
            <h1>Sign In</h1>
            {/* input username, password  */}
            <form action="" onSubmit={handleSubmit}>
                <div>
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
                <div>
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

                <div className="auth-buttons">
                    <button onClick={() => navigate('/dashboard')} className="login-btn">Login</button>
    
                </div>
                <p> Don't have an account?</p>
                <button onClick={() => navigate('/create-account')}> Create Account </button>
            </form>
        </div>
    );
}

export default Login;