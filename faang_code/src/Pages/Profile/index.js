import React, { useState, useEffect } from 'react';
import './index.css';

function Profile() {
    return (
        <div className="form-container">
            <h1>Profile</h1>
            {/* display firstname, lastname, username, email, password, etc */}
            <div className="form-field">
                <label>
                    First Name:
                </label>


            </div>

            <div className="form-field">
                <label>
                    Last Name:
                </label>
            </div>

            <div className="form-field">
                <label>
                    Email:
                </label>
            </div>

            <div className="form-field">
                <label>
                    User Name:
                </label>
            </div>

            <div className="form-field">
                <label>
                    Password:
                </label>
            </div>
        </div>
    );

}

export default Profile;