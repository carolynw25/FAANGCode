import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
//import './components/Body';
//import './components/Header';
import Navbar from './components/Navbar';
import ProblemList from './Pages/ProblemList';
import Problems from './components/Problems';
import History from './Pages/History';
import Profile from './Pages/Profile';
import Settings from './Pages/Settings';
import Login from './Pages/Login';
import CreateAcct from './Pages/CreateAcct';
import Dashboard from './Pages/Dashboard';
import WelcomePage from './Pages/WelcomePage';


function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/problems" element={<ProblemList />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/create-account" element={<CreateAcct />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
