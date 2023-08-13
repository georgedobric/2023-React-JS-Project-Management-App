import React, { useState, useEffect, useRef } from "react";
import "./Node.css";
import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";

function Node( { job, currentJob, sendNodeDataToParent }) {
  /* Turn the Node into a button which, when clicked, prompts the user to
    input some text which will be logged to the console. */

  //a state variable used to track the user-selected node
  const [selectedNode, setSelectedNode] = useState(0);
  const SwitchJob = (id) => {
    setSelectedNode(id);
    //setJobNodes(job[id].tree); //TEMPORARILY COMMENTED OUT

  }

  console.log("the current job is: " + currentJob);
  console.log(job[currentJob]);
  //initialization
  //const [jobNodes, setJobNodes] = useState(job[currentJob].tree);

  const nodesVal = [{id:0, subject:"Root"}]; // initialize nodes here
const jobNumberVal = 0; // initialize jobNumber here

//const [jobNodes, setJobNodes] = useState([nodes: nodesVal, jobNumber: jobNumberVal]);
const [jobNodes, setJobNodes] = useState( { nodes: nodesVal, jobNumber: jobNumberVal } );

  //const [jobNodes, setJobNodes] = useState([nodes, jobNumber]);

  console.log("the jobnodes array is: ");
  console.log(jobNodes);

  //Create an object which references the newObject assigned by the user
  let addedObject = {
    id: undefined,
    subject: undefined,
    //stage: userInputNodeStage,
    //boxID: boxType,
  };

  //Handles the 'add node' button, which expands the array.
  const handleAddObject = () => {
    //Stores the new node's ID number
    let newId = jobNodes.nodes.length;
    //Stores a subject for the node
    const userInputNodeSubject = prompt("Enter the node Subject: ");
    if (newId === undefined){
      newId = 1;
    }
    //Create the new node object
    const newObject = {
      id: newId,
      subject: userInputNodeSubject,
      //stage: userInputNodeStage,
      //boxID: boxType,
    };
    addedObject = newObject;

    //Add the new node object to the jobNodes array

    // setJobNodes(prevJobNodes => [
    //   ...prevJobNodes.map(jobNodes => ({
    //     ...jobNodes,
    //     nodes: [...jobNodes.nodes, newObject]
    //   }))
    // ]);

    //ok so this line is causing an error upon adding nodes to a second job
    // error: jobnodes.nodes is not iterable
    // attempted fix: lets try to switch this assignment using state
    console.log("jobNodes is --------------------------------------");
    console.log(jobNodes); // Check what jobNodes.nodes contains
    console.log("newObject is --------------------------------------");
    console.log(newObject);
    if (newObject.id !== undefined){
      jobNodes.nodes = [...jobNodes.nodes, newObject];
    }

    jobNodes.jobNumber = currentJob;
    job[currentJob].tree = jobNodes.nodes;
  };

// useEffect(() => {
//   if (jobNodes.jobNumber !== currentJob){
//     jobNodes.nodes = job[currentJob].tree;
//     jobNodes.jobNumber = currentJob;
//   }
//   else {
//     jobNodes.nodes = [...jobNodes.nodes, addedObject];
//   }
// }) 
const [data, setData] = useState([]);

useEffect(() => {
  async function fetchData() {
      try {
          const response = await fetch('http://localhost:3000/api/data'); // Replace with your endpoint
          const jsonData = await response.json();
          setData(jsonData);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }

  fetchData();
}, []); // Empty dependency array means this will run once after component mount

  return (
    <div>
      <div className="nodeWindowBorder"></div>
      <div className="nodeContainer" onClick={getMouseEventOptions}>
        {Array.isArray(job[currentJob].tree) && job[currentJob].tree.map((obj) => (
            <div
            className="box text"
            key={obj.id}>
            {obj.subject}
            </div>
        ))}
      </div>
      {/*<div className="info">
        <div className="textHeader">Node Info</div>
        <div className="text">
          <div className="textSubHeader">Subject:</div>
          <br />
          {jobNodes[selectedNode].subject}
          <br />
          <div className="textSubHeader">Stage:</div>
          <br />
          {jobNodes[selectedNode].stage}
        </div>
        </div>*/}

      <button className="addNodeBox" onClick={handleAddObject}>
        Add Node
      </button>

    </div>
  );
}

export default Node;