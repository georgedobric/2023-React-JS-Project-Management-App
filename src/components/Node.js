import React, { useState, useEffect, useRef } from "react";
import "./Node.css";
import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";

function Node(props) {
  //Detect the cursor if it hovers over a node, to enable node-preview functionality

  const [Preview, setPreview] = useState(false);
  const [PreviewID, setPreviewID] = useState(0);
  const [ScrollingUp, setScrollingUp] = useState(false);
  const [ScrollingDown, setScrollingDown] = useState(false);

  const [previewObject, setPreviewObject] = useState(props.jobs[props.SelectedJob].tree[0]);
  const handleMouseEnter = (id) => {
    setPreview(true);
    // setPreviewID(id - 1);
    setPreviewID(id);
    const previewObjectSetter = props.jobs[props.SelectedJob].tree.find(obj =>
      obj.nodeID.length === id.length &&
      obj.nodeID.every((nodeID, index) => nodeID === id[index])
      );
      // previewObject = previewObjectSetter;
      setPreviewObject(previewObjectSetter);
  };

  const handleMouseLeave = () => {
    setPreview(false);
  };


  //Count the hierarcy length
  const hierarchyLengthCounter = (targetHierarchy) => {
    let count = 0;
    
    props.jobs[props.SelectedJob].tree.forEach(node => {
      const nodeHierarchy = node.nodeID.slice(0, -1); // Extract all but the last element
      if (JSON.stringify(nodeHierarchy) === JSON.stringify(targetHierarchy)) {
        count++;
      }
    });
    
    return count;
  };
  

  //Add a new node to the selected job

  const handleAddNode = () => {
    //assign the unique node identifier
    // setSelectedNodeTree(...props.jobs[props.SelectedJob].tree[props.SelectedNode].selectedNodeTree, props.jobs[props.SelectedJob].id);
    // const updatedSelectedNodeTree = [...SelectedNodeTree, props.SelectedNode];
    // props.NodeSelectedNodeTreeModifier(updatedSelectedNodeTree);

    // const updatedHierarchy = [props.jobs[props.SelectedJob].tree.length+1, 1]; //the second parameter should be the length of said hierarchy
    //also the second parameter should be under handlenestednode adding not here, here just the first parameter is fine, for now.
    //or I can remove the nestedhandler and just use this, by having the selected node changed to selectedtreenode, the matrix array
    //and just map the length of the selected hierarchy, which is an array like selectedtreenode, with one less element, marking all nodes of the same hierarchy

    //i need to use slice of length - 1 on the nodeID to set the hierarchy and to find hierarchy length, in order to assign newest nodes nodeID unique identifier.
    // if (props.jobs[props.SelectedJob].tree[props.SelectedNode].nodeID.length - 1 === props.jobs[props.SelectedJob].tree[props.SelectedNode].hierarchy.length) {
    //   const targetHierarchyMatching = 
    // }
    // const targetHierarchy = props.jobs[props.SelectedJob].tree[props.SelectedNode].nodeID.slice(0,-1);
    const targetHierarchy = foundObject.nodeID.slice(0,-1);
    const hierarchyLength = hierarchyLengthCounter(targetHierarchy);

    // const updatedNodeID = props.jobs[props.SelectedJob].tree.id;
    // const updatedHierarchy = [props.jobs[props.SelectedJob].tree.length+1, hierarchyLength + 1];

    const updatedHierarchy = [...props.Hierarchy, hierarchyLength+1];
    // const updatedHierarchy = [...targetHierarchy, hierarchyLength + 1];
    const updatedNodeID = [...updatedHierarchy, targetHierarchy.length + 1];
    const newNode = {subject:prompt('Enter a node subject'), hierarchy:props.Hierarchy, nodeID:updatedHierarchy};
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

  //Selected node array (the unique node identifier system)

  const [SelectedNodeTree, setSelectedNodeTree] = useState([0]);

  const handleSelectedNodeTree = () => {
    // updatedSelectedNodeTree = [...selectedNodeTree, props.SelectedNode];
    // const updatedJob = [...props.jobs, hierarchy: HierarchyLevel, tree[props.SelectedNode].selectedNodeTree: updatedSelectedNodeTree ];
    
    // const updatedSelectedNodeTree = [...SelectedNodeTree, props.SelectedNode];
    // props.NodeSelectedNodeTreeModifier(updatedSelectedNodeTree);
  }

  //Scroll up while previewing a node to enter a lower level, more technical, under said node.

  const handleAddNestedNode = () => {
    //assign the unique node identifier
    ////setSelectedNodeTree([...props.jobs[props.SelectedJob].tree[props.SelectedNode].selectedNodeTree, 1]);

    //so the above added number will be .length  but not of selected node rather of hierarchy, so hierarchy.length
    //setSelectedNodeTree([...props.jobs[props.SelectedJob].tree[props.SelectedNode].selectedNodeTree, props.jobs[props.SelectedJob].tree[props.SelectedNode].tree.length]);
    //for now, i'll use 1

    //below is pseudocode for how the hierarchy should be set, this is to set the node id (selectednodetree) for the new node, since we need the length of that hierarchy's nodes
    // const updatedHierarchy = [...props.Hierarchy, props.jobs[props.SelectedJob].id, props.jobs[SelectedJob].tree[hierarchy].map.length];
    // props.setHierarchy(updatedHierarchy)
    //to get started with implementing the above, lets assign each node a hierarchy first, the highest level, initial nodes should be initialized
    // with an initial hierarchy array that is set simply to the node's id



    // const updatedSelectedNodeTree = [...SelectedNodeTree, props.SelectedNode];
    // props.NodeSelectedNodeTreeModifier(updatedSelectedNodeTree);

    //// const newNode = {id:props.jobs[props.SelectedJob].tree.length+1, subject:prompt('Enter a node subject'), selectedNodeTree: SelectedNodeTree};
    //// props.NodeModifier(newNode);
    // handleNodeSelect(obj.nodeID);
    // const targetHierarchy = Object.assign(foundObject.nodeID);
    // targetHierarchy[targetHierarchy.length-1] += 1;
    // const hierarchyLength = hierarchyLengthCounter(targetHierarchy);
    // props.HierarchySetter(targetHierarchy);
    // const updatedHierarchy = [...foundObject.nodeID, hierarchyLength+1];
    // const updatedNodeID = [...updatedHierarchy, targetHierarchy.length + 1];
    // const tempID = [...foundObject.nodeID, 1];
    // const hierarchyLength = []
    const newID = [...foundObject.nodeID, 1]; //second argument should be the length of the hierarchy
    // or rather, it should only add a node if the hierarchy length is 0, and, in fact, that should be a button not immediate add maybe.
    props.HierarchySetter(foundObject.nodeID);
    const newHierarchy = [...foundObject.nodeID];
    const newNode = {subject:prompt('Enter a node subject'), hierarchy:newHierarchy, nodeID:newID};
    props.NodeModifier(newNode);
  }

  const [HierarchyLevel, setHierarchyLevel] = useState(1);

  const handleHierarchyShift = (nodePreview, scrollUpStatus, nodeID, scrollDownStatus) => {
//     if (nodePreview == true && scrollUpStatus == true) {
//       console.log('step down');
//       handleAddNestedNode();
//       if (nodePreview === true) {
//         const hLevel = HierarchyLevel + 1;
//         setHierarchyLevel(hLevel);
//         console.log("Hierarchy Level is: " + HierarchyLevel);
//         setPreview(false);
//       }
//   }
//   else if (nodePreview == true && scrollDownStatus == true) {
//     console.log('step up');
//     // handleAddNestedNode();
//     const StepUpHierarchy = props.Hierarchy - 1;
//     props.HierarchySetter(StepUpHierarchy);
//     if (nodePreview === true) {
//       // const hLevel = HierarchyLevel - 1;
//       // setHierarchyLevel(hLevel);
//       // console.log("Hierarchy Level is: " + HierarchyLevel);
//       setPreview(false);
//     }
// }
if (nodePreview == true && scrollUpStatus == true) {
  console.log('step down');
  handleNodeSelect(nodeID);
  handleAddNestedNode();
  if (nodePreview === true) {
    const hLevel = HierarchyLevel + 1;
    setHierarchyLevel(hLevel);
    console.log("Hierarchy Level is: " + HierarchyLevel);
    setPreview(false);
  }
}
else if (nodePreview == true && scrollDownStatus == true) {
console.log('step up');
// handleAddNestedNode();
const StepUpHierarchy = props.Hierarchy - 1;
props.HierarchySetter(StepUpHierarchy);
if (nodePreview === true) {
  // const hLevel = HierarchyLevel - 1;
  // setHierarchyLevel(hLevel);
  // console.log("Hierarchy Level is: " + HierarchyLevel);
  setPreview(false);
}
}
}

  //Handle scroll logic

  const handleScroll = (event) => {
    try {
    if (event.deltaY < 0) {
      setScrollingUp(true)
      setScrollingDown(false);
    }
    else if (event.deltaY === 0) {
      // setScrollingUp(false);
    }
    else if (event.deltaY > 0) {
      setScrollingDown(true);
      setScrollingUp(false);
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

  //target the selected node for the node info display
  // const targetValue = 5;

  // const foundObject = props.jobs[props.SelectedJob].tree.find(obj =>
  //   obj.nodeID.length === props.SelectedNode.length &&
  //   obj.nodeID.every((nodeID, index) => nodeID === props.SelectedNode[index])
  //   );
  const [foundObject, setFoundObject] = useState(props.jobs[props.SelectedJob].tree[0]);
  useEffect(()=>{
  const foundObjectSetter = props.jobs[props.SelectedJob].tree.find(obj =>
    obj.nodeID.length === props.SelectedNode.length &&
    obj.nodeID.every((nodeID, index) => nodeID === props.SelectedNode[index])
    );
    setFoundObject(foundObjectSetter);
  }, [props.SelectedNode]);

  //  const [displayedHierarchy, setDisplayedHierarchy] = useState([]);
  // displayedHierarchySetter
  // const displayedHierarchy = props.jobs[props.SelectedJob].tree.filter(obj =>
  //   // obj.hierarchy.stringify === props.Hierarchy.stringify
  //   [obj.hierarchy.every((hierarchy, index) => hierarchy.stringify === props.Hierarchy[index].stringify),
  //   console.log(obj.subject + ' in hierarchy: ' + obj.hierarchy.stringify + ' and props index hier is: ' + props.Hierarchy.stringify)
  // ]);

  // const displayedHierarchy = props.jobs[props.SelectedJob].tree.filter(obj =>
  //   obj.hierarchy.every((hierarchy, index) => hierarchy === props.Hierarchy[index])
  // );
  const displayedHierarchy = props.jobs[props.SelectedJob].tree
    .filter(obj => obj.hierarchy.join('') === props.Hierarchy.join(''));
  
  console.log('-----------------------');
  console.log('========The current Hierarcy is:' + props.Hierarchy +'========');
  // setDisplayedHierarchy(displayedHierarchySetter);

  // if (foundObject) {
  //   console.log("Found object:", foundObject);
  // } else {
  //   console.log("No object found with the target value.");
  // }


  return (
    <div>
    <div className='nodeWindowBorder'></div>
      <div className="nodeContainer" onClick={getMouseEventOptions}>
      {props.JobSelectStatus && displayedHierarchy.map((obj) => (
        <div key={obj.id}
        className='box text'
        onMouseEnter={() => {
          handleMouseEnter(obj.nodeID);
        }}
        onMouseLeave={() => {
          handleMouseLeave();
        }}
        onClick={() => {
          handleNodeSelect(obj.nodeID);
        }}
        onWheel={() => {
          handleHierarchyShift(Preview, ScrollingUp, PreviewID, ScrollingDown);
        }}>
          {obj.subject}
      </div>
      ))}
    </div>

    {Preview && <div className="previewBox text">{previewObject.subject}'s objective: {previewObject.objective}</div>}


    <div className="info">
        <div className="textHeader">Node Info</div>
        <div className="nodeInfoText">
          <div className="textSubHeader">Subject: {foundObject.subject}</div>
          <br />
          <div className="textSubHeader">ID: {foundObject.nodeID}</div>

          <p className='textSubHeader'>Objective: {foundObject.objective}</p>
          <input
        type="Objective"
        value={userInput}
        onChange={handleNodeObjective}
        className='nodeInfoInput'
        placeholder="Enter the objective, what do you aim to achieve here?"
      />
      <p className='textSubHeader'>Planning: {foundObject.plan}</p>
          <input
        type="Objective"
        value={userInputPlan}
        onChange={handleNodePlan}
        className='nodeInfoInput'
        placeholder="Enter the plan: Can I define some tasks to reach this objective? Can I create a schedule? Can I allocate resources? Can I set some milestones?"
      />
      <p className='textSubHeader'>Collaboration: {foundObject.collaboration}</p>
          <input
        type="Objective"
        value={userInputCollaboration}
        onChange={handleNodeCollaboration}
        className='nodeInfoInput'
        placeholder="Can I leverage an internal resource?"
      />
      <p className='textSubHeader'>Communication: {foundObject.communication}</p>
          <input
        type="Objective"
        value={userInputCommunication}
        onChange={handleNodeCommunication}
        className='nodeInfoInput'
        placeholder="Please post the latest updates, any changes, improvements, issues? What are we working on right now?"
      />
      <p className='textSubHeader'>Risk Management: {foundObject.risk}</p>
          <input
        type="Objective"
        value={userInputRisk}
        onChange={handleNodeRisk}
        className='nodeInfoInput'
        placeholder="Enter possible risks: Are there any potential risks that I can foresee at this point in time?"
      />
        </div>
        </div>

    <button className='addNodeBox' onClick={handleAddNode}>Add Node</button>
    <button className='updateNodeBox' onClick={()=> {handleObjectiveUpdate(userInput); handlePlanUpdate(userInputPlan); handleCollaborationUpdate(userInputCollaboration); handleCommunicationUpdate(userInputCommunication); handleRiskUpdate(userInputRisk)}}>Update Node</button>


    </div>
  );
}
export default Node;


