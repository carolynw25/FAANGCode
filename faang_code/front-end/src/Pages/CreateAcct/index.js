import React from 'react';
import './index.css';
import {useNavigate} from "react-router-dom";

function CreateAcct() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Create an Account</h1>
            {/* input firstname, lastname, username, email, password, etc */}
            <button onClick={() => navigate('/dashboard')}>Sign Up</button>
        </div>
    );
}

export default CreateAcct;