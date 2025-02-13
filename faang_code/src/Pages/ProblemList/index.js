import React from 'react';
import './index.css';
import Problems from "../../components/Problems";

function ProblemList() {
    return (
        <div>
            <h1>List of Problems</h1>
            {/* logic to fetch and display the list of problems */}
            <div className="main-content">
                <Problems category="Completed" value="12"/>
                <Problems category="In Progress" value="150"/>
            </div>
        </div>
    );
}

export default ProblemList;