import React from 'react';
import './index.css';

function Profile() {
    return (
        <div>
            <h1>Profile</h1>
            {/* display firstname, lastname, username, email, password, etc */}
            <div>
                <label>
                    First Name:
                </label>
            </div>

            <div>
                <label>
                    Last Name:
                </label>
            </div>

            <div>
                <label>
                    Email:
                </label>
            </div>

            <div>
                <label>
                    User Name:
                </label>
            </div>

            <div>
                <label>
                    Password:
                </label>
            </div>
    </div>
    );

}

export default Profile;