import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import './components/Body';
//import './components/Header';
import Navbar from './components/Navbar';
import ProblemList from './components/ProblemList';
import Problems from './components/Problems';
import History from './components/History';
import Profile from './components/Profile';
import Settings from './components/Settings';

function App() {
    return (
        <Router>
            <div className="App">
                <title>FAANGCode</title>
                <h1 style={{ marginLeft: '230px' }}>Hello, FAANGCoder!</h1>
                <div className="main-content">
                    <Navbar />
                    <Routes>
                        <Route path="/problems" element={<ProblemList />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/history" element={<History />} />
                        <Route
                            path="/"
                            element={
                                <>
                                    <Problems category="Completed" value="12" />
                                    <Problems category="In Progress" value="150" />
                                    <Problems category="Wish" value="325" />
                                </>
                            }
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
