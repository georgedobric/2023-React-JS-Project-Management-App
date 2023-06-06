import React, { useState, useEffect, useRef } from 'react';
import './Node.css'

function Node() {
    /* Turn the Node into a button which, when clicked, prompts the user to
    input some text which will be logged to the console. */
    
    //let selectedNode = 0;
    const [selectedNode, setSelectedNode] = useState(0);
    
    const handleClick = () => {
        const userInput = prompt('Enter Text');
        //Do something with the user input
        console.log('User entered: ', userInput);
    };
    
    const boxRef = useRef(null); //Coordinates

    /* Create an array of node objects, expandable upon user input. */
    const [jobNodes, setJobNodesgit ] = useState([{ id: 0, subject: 'Root' }]);

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

        //Coordinates begins
        const getBoxCoordinates = () => {
            const boxElement = boxRef.current;
            if (boxElement) {
              const { top, left } = boxElement.getBoundingClientRect();
              console.log('Box coordinates:', { top, left });
              // Use the coordinates for further processing
            }
          };
      
          getBoxCoordinates();
        //Coordinates ends

      }, [jobNodes]);
;
    return (
        <div>
      <button className='addNodeBox'onClick={handleAddObject}>Add Node</button>
      <br></br>
      <br></br>
      <br></br>
      {jobNodes.map(obj => (
        <div className='box text' onClick={() => setSelectedNode(obj.id)} key={obj.id} ref={boxRef}>{obj.subject}</div>
      ))}
      <div className='info'>
        <div className='textHeader'>Node Info</div>
        <div className='text'>
            <div className='textSubHeader'>Subject:</div>
            <br />
            {jobNodes[selectedNode].subject}
            <br />
            <div className='textSubHeader'>Stage:</div>
            <br />
            {jobNodes[selectedNode].stage}
            </div>
      </div>
        </div>
    );
};


export default Node;
//style={{ marginBottom: '10px' }}
/*
<svg className="line">
        <line x1="50" y1="50" x2="350" y2="50" />
      </svg>
      */
//<div className='box text' key={obj.id}>{obj.subject}</div>
//        <div className='box text' onClick={handleClick}>First Node</div>
