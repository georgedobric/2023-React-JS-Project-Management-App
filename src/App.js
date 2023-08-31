import logo from './logo.svg';
import './App.css';
import './components/Node.js'
import React, { useState, useEffect } from 'react';
import Node from './components/Node';
import Job from './components/Job';

function App() {
  const [Jobs, setJobs] = useState([{id:1, title:'Ticket', tree:[ {nodeID: [1,1], hierarchy: [1], subject: 'Root', objective: '', plan: '', communication: '', collaboration: '', risk: ''}]}
 ]);
  const currentJob = 0;
  const [SelectedJob, setSelectedJob] = useState(0);
  let [SelectedNode, setSelectedNode] = useState([1,1]);
  const [Hierarchy, setHierarchy] = useState([1]);
  const [JobSelectStatus, setJobSelectStatus] = useState(false);
  const [NoJobSelection, setNoJobSelection] = useState(true);


  const JobSelector = (id) => {
    setSelectedJob(id);
    // setSelectedNode([1,1]);
    setJobSelectStatus(true);
    setNoJobSelection(false);
    console.log("The selected job is: ", SelectedJob);
  }

  const JobModifier = (obj) => {
    const updatedJob = [...Jobs, obj];
    setJobs(updatedJob);
  }

  const NodeSelector = (id) => {
    let updatedNodeSelect = id;
    // SelectedNode = updatedNodeSelect;
    setSelectedNode(updatedNodeSelect);
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

  const NestedNodeModifier = (obj) => {
    // const updatedTree = [...Jobs[SelectedJob].tree, obj];
    // setJobs(...Jobs, Jobs[SelectedJob].tree = updatedTree);

  //   const updatedTree = [...Jobs[SelectedJob].tree, obj];
  // const updatedJobs = [...Jobs]; // Copy the existing Jobs array
  // updatedJobs[SelectedJob].tree[SelectedNode].tree = updatedTree; // Update the selected job's tree

  // const updatedNestedTree = [...Jobs[SelectedJob].tree, obj];
  const updatedJobs = [...Jobs]; // Copy the existing Jobs array
  // updatedJobs[SelectedJob].tree[SelectedNode].tree = updatedNestedTree; // Update the selected job's tree
  updatedJobs[SelectedJob].tree[SelectedNode].tree = obj; // Update the selected job's tree
  setJobs(updatedJobs); // Update the state
  }

//   useEffect( () => {
//     if (SelectedJob > 0){
//       noJobSelected = false;
//     }
// }, [SelectedJob]);

  const NodeObjectiveModifier = (event) => {
    // const updatedNodeObjective = [...Jobs[SelectedJob].tree[SelectedNode], objective: event];
    const index = Jobs[SelectedJob].tree.findIndex(node =>
      node.nodeID.length === SelectedNode.length &&
      node.nodeID.every((nodeID, index) => nodeID === SelectedNode[index])
    );
    const updatedNodeObjective = [
      ...Jobs[SelectedJob].tree.slice(0, index), // Copy elements before the selected node
      {
        ...Jobs[SelectedJob].tree[index], // Copy the selected node
        objective: event, // Modify the 'objective' property
      },
      ...Jobs[SelectedJob].tree.slice(index + 1), // Copy elements after the selected node
    ];
    
    const updatedJobs=[...Jobs];
    updatedJobs[SelectedJob].tree = updatedNodeObjective;
    setJobSelectStatus(updatedJobs);
  }

  const NodePlanModifier = (event) => {
    const index = Jobs[SelectedJob].tree.findIndex(node =>
      node.nodeID.length === SelectedNode.length &&
      node.nodeID.every((nodeID, index) => nodeID === SelectedNode[index])
    );
    const updatedNodePlan = [
      ...Jobs[SelectedJob].tree.slice(0, index), // Copy elements before the selected node
      {
        ...Jobs[SelectedJob].tree[index], // Copy the selected node
        plan: event, // Modify the 'objective' property
      },
      ...Jobs[SelectedJob].tree.slice(index + 1), // Copy elements after the selected node
    ];
    
    const updatedJobs=[...Jobs];
    updatedJobs[SelectedJob].tree = updatedNodePlan;
    setJobSelectStatus(updatedJobs);
  }

  const NodeCollaborationModifier = (event) => {
    const index = Jobs[SelectedJob].tree.findIndex(node =>
      node.nodeID.length === SelectedNode.length &&
      node.nodeID.every((nodeID, index) => nodeID === SelectedNode[index])
    );
    const updatedNodePlan = [
      ...Jobs[SelectedJob].tree.slice(0, index), // Copy elements before the selected node
      {
        ...Jobs[SelectedJob].tree[index], // Copy the selected node
        collaboration: event, // Modify the 'objective' property
      },
      ...Jobs[SelectedJob].tree.slice(index + 1), // Copy elements after the selected node
    ];
    
    const updatedJobs=[...Jobs];
    updatedJobs[SelectedJob].tree = updatedNodePlan;
    setJobSelectStatus(updatedJobs);
  }

  const NodeCommunicationModifier = (event) => {
    const index = Jobs[SelectedJob].tree.findIndex(node =>
      node.nodeID.length === SelectedNode.length &&
      node.nodeID.every((nodeID, index) => nodeID === SelectedNode[index])
    );
    const updatedNodePlan = [
      ...Jobs[SelectedJob].tree.slice(0, index), // Copy elements before the selected node
      {
        ...Jobs[SelectedJob].tree[index], // Copy the selected node
        communication: event, // Modify the 'objective' property
      },
      ...Jobs[SelectedJob].tree.slice(index + 1), // Copy elements after the selected node
    ];
    
    const updatedJobs=[...Jobs];
    updatedJobs[SelectedJob].tree = updatedNodePlan;
    setJobSelectStatus(updatedJobs);
  }

  const NodeRiskModifier = (event) => {
    const index = Jobs[SelectedJob].tree.findIndex(node =>
      node.nodeID.length === SelectedNode.length &&
      node.nodeID.every((nodeID, index) => nodeID === SelectedNode[index])
    );
    const updatedNodePlan = [
      ...Jobs[SelectedJob].tree.slice(0, index), // Copy elements before the selected node
      {
        ...Jobs[SelectedJob].tree[index], // Copy the selected node
        risk: event, // Modify the 'objective' property
      },
      ...Jobs[SelectedJob].tree.slice(index + 1), // Copy elements after the selected node
    ];
    
    const updatedJobs=[...Jobs];
    updatedJobs[SelectedJob].tree = updatedNodePlan;
    setJobSelectStatus(updatedJobs);
  }

  const NodeIDModifier = (event) => {
    const index = Jobs[SelectedJob].tree.findIndex(node =>
      node.nodeID.length === SelectedNode.length &&
      node.nodeID.every((nodeID, index) => nodeID === SelectedNode[index])
    );
    const updatedJobs=[...Jobs];

    updatedJobs[SelectedJob].tree[SelectedNode].nodeID = event;
    setJobs(updatedJobs);
  }

  const HierarchySetter = (newHierarchy) => {
    setHierarchy(newHierarchy);
  }

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
          NodeSelector={NodeSelector}
          NodeObjectiveModifier={NodeObjectiveModifier}
          NodePlanModifier={NodePlanModifier}
          NodeCollaborationModifier={NodeCollaborationModifier}
          NodeCommunicationModifier={NodeCommunicationModifier}
          NodeRiskModifier={NodeRiskModifier}
          NodeIDModifier={NodeIDModifier}
          Hierarchy={Hierarchy}
          HierarchySetter={HierarchySetter}>
          </Node>
      </div>
    </div>
  );
}

export default App;


