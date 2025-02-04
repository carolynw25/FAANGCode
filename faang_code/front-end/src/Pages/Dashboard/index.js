import React from 'react';
import Problems from "../../components/Problems";
import './index.css';

function Dashboard() {
    return (
        <div>
            <h2>Welcome, FAANGCoder!</h2>
            <h1>Dashboard</h1>
            {/* track progress over time*/}
            <div className="main-content">
                <Problems category="Completed" value="12"/>
                <Problems category="In Progress" value="150"/>
                <Problems category="Wish" value="325"/>
            </div>
        </div>
    );
}

export default Dashboard;