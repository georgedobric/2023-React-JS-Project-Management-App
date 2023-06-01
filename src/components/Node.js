import React, { useState, useEffect } from 'react';
import './Node.css'

function Node() {
    /* Turn the Node into a button which, when clicked, prompts the user to
    input some text which will be logged to the console. */
    const handleClick = () => {
        const userInput = prompt('Enter Text');
        //Do something with the user input
        console.log('User entered: ', userInput);
    };
    
    /* Create an array of node objects, expandable upon user input. */
    const [jobNodes, setJobNodes] = useState([{ id: 0, subject: 'Root' }]);

    /* Handles the 'add node' button, which expands the array. */
    const handleAddObject = () => {
        const newId = jobNodes.length; //+ 1;
        const userInputNodeSubject = prompt('Enter the job Subject: ');
        const userInputNodeStage = prompt('Enter the job Stage: ');
        let boxType = 'boxStage1';
        let testingtype = 'boxStage1';
        if (userInputNodeStage == 1)
            boxType = 'boxStage1';
        else if (userInputNodeStage == 2)
            boxType = 'boxStage2';
        else if (userInputNodeStage == 3)
            boxType = 'boxStage3';
        else if (userInputNodeStage == 4)
            boxType = 'boxStage4';
        const cssSpecs = '${userInputNodeStage}';
        const newObject = { id: newId, subject: userInputNodeSubject, stage: userInputNodeStage, boxID: boxType};
        setJobNodes(prevArray => [...prevArray, newObject]);
    };
    
    useEffect(() => {
        console.log(jobNodes); // Log the updated state on each re-render
      }, [jobNodes]);
;
    return (
        <div>
      <button className='addNodeBox'onClick={handleAddObject}>Add Node</button>
      <br></br>
      <br></br>
      <br></br>
      {jobNodes.map(obj => (
        <div className='box text' key={obj.id} style={{ marginBottom: '10px' }}>{obj.subject}</div>
      ))}
        </div>
    );
};


export default Node;
/*
<svg className="line">
        <line x1="50" y1="50" x2="350" y2="50" />
      </svg>
      */
//<div className='box text' key={obj.id}>{obj.subject}</div>
//        <div className='box text' onClick={handleClick}>First Node</div>
