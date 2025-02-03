import React from 'react';
import './index.css';

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <ul className="navbar-nav d-flex flex-column">
          <li className="nav-item"><a className="nav-link" href="#">Dashboard</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Problems</a></li>
          <li className="nav-item"><a className="nav-link" href="#">History</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Settings</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Profile</a></li>
        </ul>
      </nav>
      <img src="/gator.png" alt="Image of gator"/>
    </div>
  );
}

export default Navbar;