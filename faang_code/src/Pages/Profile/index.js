import React, { useState, useEffect } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const username = localStorage.getItem('username'); // Retrieve username

    useEffect(() => {
        if (!username) {
            navigate('/login'); // Redirect if no username found
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8081/get-user?username=${username}`);
                const data = await response.json();

                if (response.ok) {
                    setUser(data);
                } else {
                    console.error('Error fetching user data:', data.message);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [username, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('username');  // Clear stored username
        navigate('/login');
    };

    if (!user) {
        return <div>Error Loading User Date</div>;
    }

    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            <div className="profile-field">
                <label>First Name:</label>
                <span>{user.firstName}</span>
            </div>
            <div className="profile-field">
                <label>Last Name:</label>
                <span>{user.lastName}</span>
            </div>
            <div className="profile-field">
                <label>Username:</label>
                <span>{user.username}</span>
            </div>
            <div className="profile-field">
                <label>Email:</label>
                <span>{user.email}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Profile;