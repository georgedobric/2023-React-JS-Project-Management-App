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

  //Create an array of node objects, expandable upon user input.
  ////const [jobNodes, setJobNodes] = useState([{ id: 0, subject: "Root" }]);
  //const [jobNodes, setJobNodes] = useState([{ id: undefined, subject: undefined }]);
  console.log("the current job is: " + currentJob);
  console.log(job[currentJob]);
  
  
  //initialization
  //const [jobNodes, setJobNodes] = useState(job[currentJob].tree);
  const [jobNodes, setJobNodes] = useState([]);

  console.log("the jobnodes array is: ");
  console.log(jobNodes);

  //Create an object which references the newObject assigned by the user
  let addedObject = {
    id: undefined,
    subject: undefined,
    //stage: userInputNodeStage,
    //boxID: boxType,
  };


  //updating job tree
  //TEMPORARILY COMMENTED OUT
  // useEffect(() => {
  //   setJobNodes(...job[currentJob].tree, addedObject);
  // }, [job[currentJob].tree]);

  
  //const [jobNodes, setJobNodes] = useState([{ id, subject}]);

  //Combine the node object to the associated job object
  /*const core {
    ...job,
    ...jobNodes
  }*/

  //jobNodes.map((obj) => (









  //Handles the 'add node' button, which expands the array.
  const handleAddObject = () => {
    ////setJobNodes(job[currentJob].tree);

    //Stores the new node's ID number
    const newId = jobNodes.length;
    
    //Stores a subject for the node
    const userInputNodeSubject = prompt("Enter the node Subject: ");
    
    //Stores the node's job stage, used to assign the node color
    ////const userInputNodeStage = prompt("Enter the node Stage: ");
    
    //Defines a default node stage/color
    let boxType = "boxStage1";
    
    //Assignment of the node's job stage:
    // if (userInputNodeStage == 2) boxType = "boxStage2";
    // else if (userInputNodeStage == 3) boxType = "boxStage3";
    // else if (userInputNodeStage == 4) boxType = "boxStage4";

    //Create the new node object
    const newObject = {
      id: newId,
      subject: userInputNodeSubject,
      //stage: userInputNodeStage,
      //boxID: boxType,
    };
    addedObject = newObject;

    //Add the new node object to the jobNodes array
    ////setJobNodes((prevArray) => [...prevArray, newObject]);
    setJobNodes([...jobNodes, newObject]);

    /*setJobNodes((prevArray) => {
      console.log("Previous Array:", prevArray);
      return [...prevArray, newObject];
    });*/
    


    //Clear the jobNodes array, select an existing tree from the selected job, and update it with the new object
    ////setJobNodes([]);
   /// if (job[currentJob].hasOwnProperty('tree')) {
      //jobNodes = job[currentJob].tree;
      ///setJobNodes([job[currentJob].tree]);
    ///} else {
      //job[currentJob].tree = [];
      //setJobNodes([]);
  ///  }
    //jobNodes = job[currentJob].tree;
 ///   setJobNodes((prevArray) => [...prevArray, newObject]);


    //Add the new node object to the jobNodes array - assign to the currently selected job
    ////setJobNodes((prevArray) => [...prevArray, newObject]);

    //job[job.current].tree = jobNodes;
    job[currentJob].tree = jobNodes;
    //job[currentJob].tree.push(newObject);
    //job[currentJob].id = 234;
  };

  // useEffect(() => {
  //   ////console.log(jobNodes); // Log the updated state on each re-render
  //   //console.log(currentJob);
  // }, [jobNodes]);




// Initialize the jobNodes array, and keep the jobNodes array updated
// TEMPORARILY commenting out this switchjob useeffect since its being called several times 
  useEffect(() => {
    if (jobNodes.length < job[currentJob].tree.length){
      setJobNodes (job[currentJob].tree, addedObject);
    }
    sendNodeDataToParent(jobNodes)
  }, [SwitchJob]);




  //temporarily removed:
  //<div className="nodeWindowBorder"></div>
 // <div className="nodeWindow" onClick={getMouseEventOptions}>

//  useEffect(() => {
//   // Find the index of the item you want to update
//   const itemIndex = job.findIndex(job => job.id === currentJob);

//   // If the item is found, update its component property
//   if (itemIndex !== -1) {
//     const updatedJob = [...job];
//     updatedJob[itemIndex].tree = jobNodes;
//     job = updatedJob;
//     //setJob(updatedJob);
//   }
// }, [job]);
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
        {Array.isArray(jobNodes) && jobNodes.map((obj) => (
            <div
            className="box text"
            onClick={() => SwitchJob(obj.id)  } 

            key={obj.id}

            
            >
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