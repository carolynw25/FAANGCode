import './App.css';
//import './components/Body';
//import './components/Header';
import Navbar from './components/Navbar';
//import './components/ProblemList';
import Problems from './components/Problems';

function App() {
  return (
    <div className='App'>
      <title>FAANGCode </title>
      <h1 style={{ marginLeft: '230px' }}>Hello, FAANGCoder!</h1>
        <div className="main-content">
            <Navbar />
            <Problems category="Completed" value="12" />
            <Problems category="In Progress" value="150" />
            <Problems category="Wish" value="325" />
        </div>
    </div>
  );
}

export default App;
