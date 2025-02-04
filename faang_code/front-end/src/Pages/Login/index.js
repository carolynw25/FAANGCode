import React from 'react';
import './index.css';
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Sign in</h1>
            {/* input username, password  */}
            <button onClick={() => navigate('/dashboard')}>Login</button>
        </div>
    );
}

export default Login;