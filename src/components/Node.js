import React, { useState, useEffect, useRef } from "react";
import "./Node.css";
import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";

function Node(props) {
  //Detect the cursor if it hovers over a node, to enable node-preview functionality
  const [Preview, setPreview] = useState(false);
  const [PreviewID, setPreviewID] = useState(0);
  const [ScrollingUp, setScrollingUp] = useState(false);

  const handleMouseEnter = (id) => {
    setPreview(true);
    setPreviewID(id - 1);
  };

  const handleMouseLeave = () => {
    setPreview(false);
  };

  //Add a new node to the selected job
  const handleAddNode = () => {
    const newNode = {id:props.jobs[props.SelectedJob].tree.length+1, subject:prompt('Enter a node subject'), };
    props.NodeModifier(newNode);
  }

  const handleNodeSelect = (id) => {
    props.NodeSelector(id);
  }

  //Input Handlers:

  const [userInput, setUserInput] = useState('');
  const handleNodeObjective = (event) => {
    setUserInput(event.target.value);
  }

  const [userInputPlan, setUserInputPlan] = useState('');
  const handleNodePlan = (event) => {
    setUserInputPlan(event.target.value);
  }

  const [userInputCollaboration, setUserInputCollaboration] = useState('');
  const handleNodeCollaboration = (event) => {
    setUserInputCollaboration(event.target.value);
  }

  const [userInputCommunication, setUserInputCommunication] = useState('');
  const handleNodeCommunication = (event) => {
    setUserInputCommunication(event.target.value);
  }

  const [userInputRisk, setUserInputRisk] = useState('');
  const handleNodeRisk = (event) => {
    setUserInputRisk(event.target.value);
  }

  //Update Handlers:

  const handleObjectiveUpdate = (objective) => {
    props.NodeObjectiveModifier(objective);
    //props.jobs[props.SelectedJob].tree[props.SelectedNode].objective
  }

  const handlePlanUpdate = (objective) => {
    props.NodePlanModifier(objective);
  }

  const handleCollaborationUpdate = (objective) => {
    props.NodeCollaborationModifier(objective);
  }

  const handleCommunicationUpdate = (objective) => {
    props.NodeCommunicationModifier(objective);
  }

  const handleRiskUpdate = (objective) => {
    props.NodeRiskModifier(objective);
  }

  //Scroll up while previewing a node to enter a lower level, more technical, under said node.

  const [HierarchyLevel, setHierarchyLevel] = useState(1);

  const handleStepDown = (nodePreview, scrollUpStatus, nodeID) => {
    if (nodePreview == true && scrollUpStatus == true) {
      console.log('step down');
      if (nodePreview === true) {
        const hLevel = HierarchyLevel + 1;
        setHierarchyLevel(hLevel);
        console.log("Hierarchy Level is: " + HierarchyLevel);
        setPreview(false);
      }
  }
}

  //Handle scroll logic

  const handleScroll = (event) => {
    try {
    if (event.deltaY < 0) {
      setScrollingUp(true)
    }
    else if (event.deltaY === 0) {
      // setScrollingUp(false);
    }
  } catch (error) {
    // Code to handle the error
    console.error("An error occurred:", error);
}
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <div>
    <div className='nodeWindowBorder'></div>
      <div className="nodeContainer" onClick={getMouseEventOptions}>
      {props.JobSelectStatus && props.jobs[props.SelectedJob].tree.map((obj) => (
        <div key={obj.id}
        className='box text'
        onMouseEnter={() => {
          handleMouseEnter(obj.id);
        }}
        onMouseLeave={() => {
          handleMouseLeave();
        }}
        onClick={() => {
          handleNodeSelect(obj.id - 1);
        }}
        onWheel={() => {
          handleStepDown(Preview, ScrollingUp, PreviewID);
        }}>
          {obj.subject}
      </div>
      ))}
    </div>

    {Preview && <div className="previewBox text">{props.jobs[props.SelectedJob].tree[PreviewID].subject}'s objective: {props.jobs[props.SelectedJob].tree[PreviewID].objective}</div>}


    <div className="info">
        <div className="textHeader">Node Info</div>
        <div className="nodeInfoText">
          <div className="textSubHeader">Subject: {props.jobs[props.SelectedJob].tree[props.SelectedNode].subject}</div>
          <br />
          <div className="textSubHeader">ID: {props.jobs[props.SelectedJob].tree[props.SelectedNode].id}</div>

          <p className='textSubHeader'>Objective: {props.jobs[props.SelectedJob].tree[props.SelectedNode].objective}</p>
          <input
        type="Objective"
        value={userInput}
        onChange={handleNodeObjective}
        className='nodeInfoInput'
        placeholder="Enter the objective, what do you aim to achieve here?"
      />
      <p className='textSubHeader'>Planning: {props.jobs[props.SelectedJob].tree[props.SelectedNode].plan}</p>
          <input
        type="Objective"
        value={userInputPlan}
        onChange={handleNodePlan}
        className='nodeInfoInput'
        placeholder="Enter the plan: Can I define some tasks to reach this objective? Can I create a schedule? Can I allocate resources? Can I set some milestones?"
      />
      <p className='textSubHeader'>Collaboration: {props.jobs[props.SelectedJob].tree[props.SelectedNode].collaboration}</p>
          <input
        type="Objective"
        value={userInputCollaboration}
        onChange={handleNodeCollaboration}
        className='nodeInfoInput'
        placeholder="Can I leverage an internal resource?"
      />
      <p className='textSubHeader'>Communication: {props.jobs[props.SelectedJob].tree[props.SelectedNode].communication}</p>
          <input
        type="Objective"
        value={userInputCommunication}
        onChange={handleNodeCommunication}
        className='nodeInfoInput'
        placeholder="Please post the latest updates, any changes, improvements, issues? What are we working on right now?"
      />
      <p className='textSubHeader'>Risk Management: {props.jobs[props.SelectedJob].tree[props.SelectedNode].risk}</p>
          <input
        type="Objective"
        value={userInputRisk}
        onChange={handleNodeRisk}
        className='nodeInfoInput'
        placeholder="Enter possible risks: Are there any potential risks that I can foresee at this point in time?"
      />
        </div>
        </div>

    <button class='addNodeBox' onClick={handleAddNode}>Add Node</button>
    <button class='updateNodeBox' onClick={()=> {handleObjectiveUpdate(userInput); handlePlanUpdate(userInputPlan); handleCollaborationUpdate(userInputCollaboration); handleCommunicationUpdate(userInputCommunication); handleRiskUpdate(userInputRisk)}}>Update Node</button>


    </div>
  );
}
export default Node;


