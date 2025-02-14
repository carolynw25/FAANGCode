//import React from 'react';
//import Problems from "../../components/Problems";
import './index.css';
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


function Dashboard() {
    //back-end database will store:
        //1. the coding problem
        //2. the user's code
        //3. the AI feedback
        // etc.?
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'AI Hints Used',
            data: [],
            borderColor: 'rgb(76, 170, 242)',
            tension: 0.1
        }]
    });

    useEffect(() => {
        // Fetch data from your API here!!
        // For now, we'll use mock data...
        const mockData = {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
            data: [7, 5, 6, 4, 2]
        };

        setChartData({
            labels: mockData.labels,
            datasets: [{
                ...chartData.datasets[0],
                data: mockData.data
            }]
        });
    }, []);


    return (
        <div>
            <div className="title">Welcome, FAANGCoder!</div>
            <h1>Dashboard</h1>
            {/* track progress over time*/}
            <div className="chart-container">
                <Line data={chartData} options={{responsive: true, maintainAspectRatio: false}}/>
            </div>
        </div>
    );
}

export default Dashboard;