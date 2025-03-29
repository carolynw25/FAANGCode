//import React from 'react';
//import Problems from "../../components/Problems";
import './index.css';
import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale,BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);


function Dashboard() {
    //back-end database will store:
        //1. the coding problem
        //2. the user's code
        //3. the AI feedback
        // etc.?
    //add more features:
        //Number of Problems Solved Over Time (Another line chart or bar chart)
        // Hints Used vs. Problems Solved Over Time (Track efficiency)
        //recent activity: display most recent coding attempt
        //badges
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

    // Hardcoded Data for Problems Solved Over Time
    const barChartData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        datasets: [{
            label: 'Problems Solved',
            data: [3, 5, 8, 6, 10], // Example numbers
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };
    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: { beginAtZero: true }
        }
    };

    return (
        <div>
            <div className="title">Welcome, FAANGCoder!</div>
            <h1>Dashboard</h1>
            {/* track progress over time*/}
            <div className="chart-container">
                <Line data={chartData} options={{responsive: true, maintainAspectRatio: false}}/>
            </div>

            {/* Problems Solved Over Time Bar Chart */}
            <div className="chart-container">
                <Bar data={barChartData} options={barChartOptions}/>
            </div>

            {/* grab from DB later...*/}
            <div className="stats-container">
                <div className="stat-item"><h3>Total Problems Solved✅</h3><p>20</p></div>
                <div className="stat-item"><h3>Difficulty Breakdown📊</h3><p>Easy: 15 | Medium: 3 | Hard: 2</p></div>
                <div className="stat-item"><h3>AI Hints Used🧠</h3> <p>47</p></div>
            </div>
        </div>
    );
}

export default Dashboard;