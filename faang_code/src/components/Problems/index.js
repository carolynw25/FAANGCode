import React from 'react';
import "./index.css";

function Problems({ category, value }) {
    return (
        <div className="problem-box">
            <h4>{category}</h4>
            <p>{value}</p>
            
        </div>
        
    );
};

export default Problems;