import React, { useState, useEffect, useRef } from "react";
import "./Node.css";
import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";

function Node( { job }) {
  /* Turn the Node into a button which, when clicked, prompts the user to
    input some text which will be logged to the console. */

  //a state variable used to track the user-selected node
  const [selectedNode, setSelectedNode] = useState(0);

  //Create an array of node objects, expandable upon user input.
  const [jobNodes, setJobNodes] = useState([{ id: 0, subject: "Root" }]);

  //Combine the node object to the associated job object
  /*const core {
    ...job,
    ...jobNodes
  }*/

  //jobNodes.map((obj) => (


  //Handles the 'add node' button, which expands the array.
  const handleAddObject = () => {
    
    //Stores the new node's ID number
    const newId = jobNodes.length;
    
    //Stores a subject for the node
    const userInputNodeSubject = prompt("Enter the node Subject: ");
    
    //Stores the node's job stage, used to assign the node color
    const userInputNodeStage = prompt("Enter the node Stage: ");
    
    //Defines a default node stage/color
    let boxType = "boxStage1";
    
    //Assignment of the node's job stage:
    if (userInputNodeStage == 2) boxType = "boxStage2";
    else if (userInputNodeStage == 3) boxType = "boxStage3";
    else if (userInputNodeStage == 4) boxType = "boxStage4";

    //Create the new node object
    const newObject = {
      id: newId,
      subject: userInputNodeSubject,
      stage: userInputNodeStage,
      boxID: boxType,
    };

    //Add the new node object to the jobNodes array
    setJobNodes((prevArray) => [...prevArray, newObject]);

    job[job.current].tree = jobNodes;
  };

  useEffect(() => {
    ////console.log(jobNodes); // Log the updated state on each re-render
  }, [jobNodes]);

  //temporarily removed:
  //<div className="nodeWindowBorder"></div>
 // <div className="nodeWindow" onClick={getMouseEventOptions}>

  return (
    <div>
      <div className="nodeWindowBorder"></div>
      <div className="nodeContainer" onClick={getMouseEventOptions}>
        {jobNodes.map((obj) => (
            <div
            className="box text"
            onClick={() => setSelectedNode(obj.id)}
            key={obj.id}
            >
            {obj.subject}
            </div>
        ))}
      </div>
      <div className="info">
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
      </div>

      <button className="addNodeBox" onClick={handleAddObject}>
        Add Node
      </button>

    </div>
  );
}

export default Node;
