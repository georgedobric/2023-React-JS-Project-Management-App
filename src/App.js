import logo from './logo.svg';
import './App.css';
import './components/Node.js'
import React, { useState, useEffect } from 'react';
import Node from './components/Node';
import Job from './components/Job';

function App() {
  const [Jobs, setJobs] = useState([{id:1, title:'Ticket', tree:[ { id: 1, subject: 'Jira' }, { id: 2, subject: 'Email' } ]},
                                    {id:2, title:'Project', tree:[ { id: 1, subject: 'Meeting' }, { id: 2, subject: 'Spec' }
 ]}] );
  const currentJob = 0;
  const [SelectedJob, setSelectedJob] = useState(0);
  const [SelectedNode, setSelectedNode] = useState(0);
  const [JobSelectStatus, setJobSelectStatus] = useState(false);
  const [NoJobSelection, setNoJobSelection] = useState(true);


  const JobSelector = (id) => {
    setSelectedJob(id);
    setJobSelectStatus(true);
    setNoJobSelection(false);
    console.log("The selected job is: ", SelectedJob);
  }

  const JobModifier = (obj) => {
    const updatedJob = [...Jobs, obj];
    setJobs(updatedJob);
  }

  const NodeSelector = (id) => {
    setSelectedNode(id);
    // setJobSelectStatus(true);
    // setNoJobSelection(false);
    console.log("The selected job is: ", SelectedNode);
  }

  const NodeModifier = (obj) => {
    // const updatedTree = [...Jobs[SelectedJob].tree, obj];
    // setJobs(...Jobs, Jobs[SelectedJob].tree = updatedTree);

    const updatedTree = [...Jobs[SelectedJob].tree, obj];
  const updatedJobs = [...Jobs]; // Copy the existing Jobs array
  updatedJobs[SelectedJob].tree = updatedTree; // Update the selected job's tree
  setJobs(updatedJobs); // Update the state
  }

//   useEffect( () => {
//     if (SelectedJob > 0){
//       noJobSelected = false;
//     }
// }, [SelectedJob]);


  return (
    <div>
      <div class='titleFont'>Symbio.sys</div>
      <br></br>
      <div class='jobBar'>
        <div class='jobFont'>Jobs</div>
        <Job jobs={Jobs} 
          JobSelector={JobSelector} 
          SelectedJob={SelectedJob} 
          JobSelectStatus={JobSelectStatus} 
          NoJobSelection={NoJobSelection}
          JobModifier={JobModifier}></Job>
      </div>
      <br></br>
      <div class='nodeBar'>
        <div class='nodeFont'>Nodes</div>
        <Node jobs={Jobs} 
          SelectedJob={SelectedJob} 
          JobSelectStatus={JobSelectStatus} 
          NodeModifier={NodeModifier}
          SelectedNode={SelectedNode}
          NodeSelector={NodeSelector}></Node>
      </div>
    </div>
  );
}

export default App;


