/////import logo from './logo.svg';
/////import './App.css';

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/




//import React from 'react';

/*
function App() {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
}

export default App;
*/

/////////////////////////////////////////////
/*
import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [jobs, setJobs] = useState([]);

  const handleAddJob = () => {
    const newJob = {
      type: '', // type char
      assignedTo: '', // type string
      dueDate: new Date(), // type date
      active: false, // type bool
      budgetTotal: 0.0, // type float
      budgetUsed: 0.0, // type float
      selected: false // type bool
    };

    setJobs([...jobs, newJob]);
  };

  return (
    <div>
      <button onClick={handleAddJob}>+ Job</button>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            Type: {job.type}, Assigned To: {job.assignedTo}, Due Date: {job.dueDate.toDateString()}, Active: {job.active.toString()}, Budget Total: {job.budgetTotal}, Budget Used: {job.budgetUsed}, Selected: {job.selected.toString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
*/
////////////////////////////////









/*
import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {

class Timeline extends React.Component {
  render() {
  return (
  <div className="notificationsFrame">
  <div className="panel">
  <div className="header">
  <div className="menuIcon">
  <div className="dashTop"></div>
  <div className="dashBottom"></div>
  <div className="circle"></div>
  </div>
  <span className="title">Timeline</span>
  <input
  type="text"
  className="searchInput"
  placeholder="Search ..." />
  <div className="fa fa-search searchIcon"></div>
  </div>
  <div className="content">
  <div className="line"></div>
  <div className="item">
  <div className="avatar">
  <img
  alt='doug'
  src="http://www.croop.cl/UI/twitter/images/doug.jpg"
 />
  </div>
  <span className="time">
  An hour ago
  </span>
  <p>Ate lunch</p>
  </div>
  <div className="item">
  <div className="avatar">
  <img
 
  alt='doug'
 src="http://www.croop.cl/UI/twitter/images/doug.jpg" />
  </div>
  <span className="time">10 am</span>
  <p>Read Day two article</p>
  </div>
  <div className="item">
  <div className="avatar">
  <img
  alt='doug'
 src="http://www.croop.cl/UI/twitter/images/doug.jpg" />
  </div>
  <span className="time">10 am</span>
  <p>Lorem Ipsum is simply dummy text of the printing and
 typesetting industry.</p>
  </div>
  <div className="item">
  <div className="avatar">
  <img
  alt='doug'
 src="http://www.croop.cl/UI/twitter/images/doug.jpg" />
  </div>
  <span className="time">2:21 pm</span>
  <p>Lorem Ipsum has been the industry's standard dummy
 text ever since the 1500s, when an unknown printer took a galley of
 type and scrambled it to make a type specimen book.</p>
  </div>
  </div>
  </div>
  </div>
  )
  }
 }
}

 export default App;
*/