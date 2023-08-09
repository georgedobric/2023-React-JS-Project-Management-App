import logo from './logo.svg';
import './App.css';
import './components/Node.js'
import React, { useState, useEffect } from 'react';
import Node from './components/Node';
import Job from './components/Job';
//import Test from './components/Test';
function App( { selectedJob }) {

  //Create an array of job objects, expandable upon user input.
   ///const [job, setJob] = useState([{id:0, title:'root', tree:[ { id: 0, subject: "Root" } ]}] );
   const [job, setJob] = useState([
    { id: 0, title:'first', tree: [{ id: 31, subject: 'code' }, { id: 32, subject: 'morecode' }] },
    { id: 1, title:'root', tree: [{ id: 11, subject: 'Math' }, { id: 12, subject: 'Science' }] },
    { id: 2, title:'two', tree: [{ id: 21, subject: 'History' }, { id: 22, subject: 'Geography' }] }
  ]);
  //const [job, setJob] = useState([{id:0}]);

  job.current = 0;
  ////////////////////////////////
  //Create and handle the selected job number from the job component
  const [dataFromChild, setDataFromChild] = useState('');

  const handleDataFromChild = (data) => {
    setDataFromChild(data);
  };
  ////////////////////////////////

  useEffect(() => {
    console.log(job); // Log the updated state on each re-render
    job.current = dataFromChild; //edit 06.28.23
  }, [job]);

  /*const asdf = document.getElementById('viewing');

  asdf.addEventListener('mouseenter', () => {
    asdf.classList.add('hovered');
  });
  
  asdf.addEventListener('mouseleave', () => {
    asdf.classList.remove('hovered');
  });*/

  //id='viewing' should be added to the <p>  selected job div if that is the intention

  return (
    <div className='contianer'>
      <Job job={job} setJob={setJob} sendDataToParent={handleDataFromChild}/>
      <div>
      <Node job={job} currentJob={dataFromChild || 0}/>
      </div>
      <div style={{ textAlign: 'center' }}>
      <p className='selectedJob'>Selected Job: {dataFromChild}</p>
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