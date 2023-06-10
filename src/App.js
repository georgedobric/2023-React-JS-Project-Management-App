import logo from './logo.svg';
import './App.css';
import './components/Node.js'
import React, { useState, useEffect } from 'react';
import Node from './components/Node';
import Job from './components/Job';
//import Test from './components/Test';
function App( { selectedJob }) {

  //Create an array of job objects, expandable upon user input.
  const [job, setJob] = useState([{id:0, title:'root'}]);

  ////////////////////////////////
  const [dataFromChild, setDataFromChild] = useState('');

  const handleDataFromChild = (data) => {
    setDataFromChild(data);
  };
  ////////////////////////////////

  useEffect(() => {
    console.log(job); // Log the updated state on each re-render
  }, [job]);

  return (
    <div className='contianer'>
      <Job job={job} setJob={setJob} sendDataToParent={handleDataFromChild}/>
      <div>
      <Node job={job} />
      </div>
      <div style={{ textAlign: 'center' }}>
      <p>Data from Child: {dataFromChild}</p>
      </div>
    </div>
  );
}

//ReactDOM.render(<App />, document.getElementById('root'));
export default App;


/* // reactdom is no longer supported, switch to create root instead
import { createRoot } from 'react-dom';

// ...

// Create a root using createRoot
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Render your React component
root.render(<App />);
*/