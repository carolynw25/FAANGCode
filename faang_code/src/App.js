import './App.css';
import React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import ProblemList from './Pages/ProblemList';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import CreateAcct from './Pages/CreateAcct';
import Dashboard from './Pages/Dashboard';
import WelcomePage from './Pages/WelcomePage';

function App() {
    return (
        <HashRouter>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/problems" element={<ProblemList />} />
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/create-account" element={<CreateAcct />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </HashRouter>
    );
}
export default App;
