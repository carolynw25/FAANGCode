//import React from 'react';
//import Problems from "../../components/Problems";
import './index.css';
import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {useNavigate} from "react-router-dom";
import { Chart as ChartJS, CategoryScale, LinearScale,BarElement, PointElement, LineElement, Title, Tooltip, ArcElement, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, ArcElement, Legend);

//function for hint badges & achievements
function getHintBadges(totalHints) {
    const badges = [];

    if (totalHints >= 1) badges.push("hint_novice");
    if (totalHints >= 10) badges.push("hint_apprentice");
    if (totalHints >= 25) badges.push("hint_pro");
    if (totalHints >= 50) badges.push("hint_legend");

    return badges;
}
//function for debug badges and achievements
function getDebugBadges(totalDebugs) {
    const badges = [];

    if (totalDebugs >= 1) badges.push("debug_scout");
    if (totalDebugs >= 10) badges.push("debug_hunter");
    if (totalDebugs >= 25) badges.push("debug_master");
    if (totalDebugs >= 50) badges.push("debug_whisperer");

    return badges;
}

function Dashboard() {
    const [userStats, setUserStats] = useState(null);
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'AI Hints Used',
            data: [],
            borderColor: 'rgb(76, 170, 242)',
            tension: 0.1
        }]
    });
    const [barChartData,setBarChartData] = useState({
        labels: [],
        datasets: []
    });
    const [barChartTotalData, setBarChartTotalData] = useState({
        labels: [],
        datasets: []
    });
    const [pieChartData, setPieChartData] = useState({ labels: [], datasets: [] });

    const navigate = useNavigate();

    useEffect(() => {
        //get username & id from localStorage
        const storedUsername = localStorage.getItem("loggedUsername");
        const storedUserId = localStorage.getItem("loggedUserId");

        //if user not logged in, redirect
        if (!storedUsername) {
            navigate('/login');
        }

        //fetch data from your API
        if (storedUsername) {
            setUsername(storedUsername);
            setUserId(storedUserId);

            fetch(`http://localhost:8081/get-user-info?id=${storedUserId}`)
                .then(response => response.json())
                .then(data => {
                    setUserStats(data);
                    const totalHints = data.totalNumHintsEasy + data.totalNumHintsMedium + data.totalNumHintsHard;

                    //horizontal bar chart displaying count of all attribute totals
                    setBarChartTotalData({
                        labels: ['AI Hints Used', 'Debug Requests', 'Complexity Checks'],
                        datasets: [{
                            label: 'Number of Times Used',
                            data: [
                                totalHints || 0,
                                data.totalDebug || 0,
                                data.totalComplexity || 0,
                            ],
                            backgroundColor: [
                                'rgba(75,147,192,0.6)',
                                'rgb(202,109,47)',
                                'rgb(31,49,170)'
                            ],
                            borderColor: [
                                'rgb(85,169,205)',
                                'rgb(246,135,58)',
                                'rgb(48,74,253)'
                            ],
                            borderWidth: 3
                        }]
                    });


                    //car chart of hint breakdown
                    setBarChartData({
                        labels: ['Easy Hints', 'Medium Hints', 'Hard Hints'],
                        datasets: [{
                            label: 'Hints Used by Difficulty',
                            data: [
                                data.totalNumHintsEasy || 0,
                                data.totalNumHintsMedium || 0,
                                data.totalNumHintsHard || 0
                            ],
                            backgroundColor: [
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(255, 99, 132, 0.6)'
                            ],
                            borderColor: [
                                'rgba(75, 192, 192, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(255, 99, 132, 1)'
                            ],
                            borderWidth: 3
                        }]
                    });

                    // Pie chart of stats
                    setPieChartData({
                        labels: ['Hints', 'Debug', 'Complexity'],
                        datasets: [
                            {
                                data: [
                                    totalHints || 0,
                                    data.totalDebug || 0,
                                    data.totalComplexity || 0
                                ],
                                backgroundColor: [
                                    '#45a049', // Green for Hints
                                    '#FF4500', // Orange-Red for Debug
                                    '#4169E1'  // Royal Blue for Complexity
                                ],
                                borderColor: [
                                    '#121A27', // Dark border for Hints
                                    '#121A27',  // Gray border for Debug
                                    '#121A27' // Light Gray border for Complexity
                                ],
                                borderWidth: 1.5
                            }
                        ]
                    });


                })
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, [navigate]);

    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    };

    const horizontalBarChartOptions = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    };

    const totalHintsUsed = userStats
        ? userStats.totalNumHintsEasy + userStats.totalNumHintsMedium + userStats.totalNumHintsHard
        : 0;

    const userHintBadges = getHintBadges(totalHintsUsed);
    const debugBadges = userStats ? getDebugBadges(userStats.totalDebug || 0) : [];

    function HintBadge({ title, icon, unlocked }) {
        return (
            <div className={`badge ${unlocked ? 'unlocked' : 'locked'}`}>
                <img src={icon} alt={title} className="badge-icon" />
                <p>{title}</p>
            </div>
        );
    }

    return (
        <div className = "dashboard-content">
            <div className="title">Welcome, FAANGCoder!</div>
            <h1>{username ? `${username}'s Dashboard` : 'Dashboard'}</h1>

            {/* Bar chart of usage summary*/}
            <div className="card">
                <h3>FAANGCode Usage Summary</h3>
                <div className="chart-container">
                    <Bar data={barChartTotalData} options={horizontalBarChartOptions}/>
                </div>
            </div>

            {/* Bar chart of hint breakdown */}
            <div className="card">
                <h3>Hints Used by Difficulty</h3>
                <div className="chart-container">
                    <Bar data={barChartData} options={barChartOptions}/>
                </div>
            </div>

            {/*/!* Pie chart of comparisons *!/*/}
            {/*<div className="card">*/}
            {/*    <h3>AI Feature Distribution</h3>*/}
            {/*    <div className="chart-container">*/}
            {/*        <div style={{width: '50%', margin: 'auto'}}>*/}
            {/*            <Pie data={pieChartData} options={{plugins: {legend: {position: 'bottom'}}}}/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/* grabs from DB, but sets a default of 0*/}
            <div className="stats-container">
                <div className="stat-item">
                    <div className="card_title">Badges and Achievements</div>
                    <div className="badge-container">
                        <HintBadge title="Hint Novice" icon="/Badges/badge1.png"
                                   unlocked={userHintBadges.includes("hint_novice")}/>
                        <HintBadge title="Hint Apprentice" icon="/Badges/badge2.png"
                                   unlocked={userHintBadges.includes("hint_apprentice")}/>
                        <HintBadge title="Hint Professional" icon="/Badges/badge3.png"
                                   unlocked={userHintBadges.includes("hint_pro")}/>
                        <HintBadge title="Hint Legend" icon="/Badges/badge4.png"
                                   unlocked={userHintBadges.includes("hint_legend")}/>
                    </div>
                    <div className="badge-container">
                        <HintBadge title="Debug Scout" icon="/Badges/badge1D.png"
                                   unlocked={debugBadges.includes("debug_scout")}/>
                        <HintBadge title="Debug Hunter" icon="/Badges/badge2D.png"
                                   unlocked={debugBadges.includes("debug_hunter")}/>
                        <HintBadge title="Debug Master" icon="/Badges/badge3D.png"
                                   unlocked={debugBadges.includes("debug_master")}/>
                        <HintBadge title="Debug Whisperer" icon="/Badges/badge4D.png"
                                   unlocked={debugBadges.includes("debug_whisperper")}/>
                    </div>
                </div>
                <div className="stat-item">
                    <div className="card_title">Hint Difficulty Breakdown</div>
                    <p>Easy: {userStats ? userStats.totalNumHintsEasy : 0} |
                        Medium: {userStats ? userStats.totalNumHintsMedium : 0} |
                        Hard: {userStats ? userStats.totalNumHintsHard : 0}</p></div>
                <div className="stat-item">
                    <div className="card_title">How You've Used FAANGCode</div>
                    <p>Total Hint Usage: {userStats ? totalHintsUsed : 0}</p>
                    <p>Debugging Requests: {userStats ? userStats.totalDebug : 0}</p>
                    <p>Time/Space Complexity Checks: {userStats ? userStats.totalComplexity : 0}</p>
                    <div style={{width: '50%', margin: 'auto'}}>
                        <Pie data={pieChartData} options={{plugins: {legend: {position: 'bottom'}}}}/>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;