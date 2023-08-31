import React, { useState, useEffect, useRef } from "react";
import "./Node.css";
import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";

function Node(props) {
  const [Preview, setPreview] = useState(false);
  const [PreviewID, setPreviewID] = useState(0);
  const [ScrollingUp, setScrollingUp] = useState(false);
  const [ScrollingDown, setScrollingDown] = useState(false);
  const [previewObject, setPreviewObject] = useState(
    props.jobs[props.SelectedJob].tree[0]
  );

  //Let the user preview nodes with a mouse hover.
  const handleMouseEnter = (id) => {
    setPreview(true);
    setPreviewID(id);
    const previewObjectSetter = props.jobs[props.SelectedJob].tree.find(
      (obj) =>
        obj.nodeID.length === id.length &&
        obj.nodeID.every((nodeID, index) => nodeID === id[index])
    );
    setPreviewObject(previewObjectSetter);
  };

  const handleMouseLeave = () => {
    setPreview(false);
    setScrollingDown(false);
    setScrollingUp(false);
  };

  //Count the hierarcy length, used to help for the nodeID of newly-added nodes.
  const hierarchyLengthCounter = (targetHierarchy) => {
    let count = 0;
    props.jobs[props.SelectedJob].tree.forEach((node) => {
      const nodeHierarchy = node.nodeID.slice(0, -1); // Extract all but the last element
      if (JSON.stringify(nodeHierarchy) === JSON.stringify(targetHierarchy)) {
        count++;
      }
    });

    return count;
  };

  //Add a new node to the selected job & selected hierarchy.
  const handleAddNode = () => {
    const targetHierarchy = foundObject.nodeID.slice(0, -1);
    const hierarchyLength = hierarchyLengthCounter(targetHierarchy);

    const updatedHierarchy = [...props.Hierarchy, hierarchyLength + 1];
    const updatedNodeID = [...updatedHierarchy, targetHierarchy.length + 1];
    const newNode = {
      subject: prompt("Enter a node subject"),
      hierarchy: props.Hierarchy,
      nodeID: updatedHierarchy,
    };
    props.NodeModifier(newNode);
  };

  //Store the user's selected node by passing in the nodeID.
  const handleNodeSelect = (id) => {
    props.NodeSelector(id);
  };

  //Input Handlers:
  const [userInput, setUserInput] = useState("");
  const handleNodeObjective = (event) => {
    setUserInput(event.target.value);
  };

  const [userInputPlan, setUserInputPlan] = useState("");
  const handleNodePlan = (event) => {
    setUserInputPlan(event.target.value);
  };

  const [userInputCollaboration, setUserInputCollaboration] = useState("");
  const handleNodeCollaboration = (event) => {
    setUserInputCollaboration(event.target.value);
  };

  const [userInputCommunication, setUserInputCommunication] = useState("");
  const handleNodeCommunication = (event) => {
    setUserInputCommunication(event.target.value);
  };

  const [userInputRisk, setUserInputRisk] = useState("");
  const handleNodeRisk = (event) => {
    setUserInputRisk(event.target.value);
  };

  //Update Handlers:
  const handleObjectiveUpdate = (objective) => {
    props.NodeObjectiveModifier(objective);
  };

  const handlePlanUpdate = (objective) => {
    props.NodePlanModifier(objective);
  };

  const handleCollaborationUpdate = (objective) => {
    props.NodeCollaborationModifier(objective);
  };

  const handleCommunicationUpdate = (objective) => {
    props.NodeCommunicationModifier(objective);
  };

  const handleRiskUpdate = (objective) => {
    props.NodeRiskModifier(objective);
  };

  //Called when the user scrolls up while previewing a node. Prompts the user to enter a child node.
  const handleAddNestedNode = () => {
    const newID = [...foundObject.nodeID, 1]; //second argument should be the length of the hierarchy
    // or rather, it should only add a node if the hierarchy length is 0, and, in fact, that should be a button not immediate add maybe.
    props.HierarchySetter(foundObject.nodeID);
    const newHierarchy = [...foundObject.nodeID];
    const isNotNullSteppDownCheck = props.jobs[props.SelectedJob].tree.filter((obj) => obj.nodeID.join('') === newID.join(''));
    if(isNotNullSteppDownCheck.length<1) {
      const newNode = {
        subject: prompt("Enter a node subject"),
        hierarchy: newHierarchy,
        nodeID: newID,
      };
      props.NodeModifier(newNode);
      handleNodeSelect(newNode.nodeID);
    }
    handleNodeSelect(newID);
  };

  //Change the hierarchy value upon the user 'stepping' down or up form a parent node to a child node, or vice versa, respectively.
  const handleHierarchyShift = (
    nodePreview,
    scrollUpStatus,
    nodeID,
    scrollDownStatus
  ) => {
    if (nodePreview == true && scrollUpStatus == true) {
      console.log("step down");
      handleNodeSelect(nodeID);
      handleAddNestedNode();
      if (nodePreview === true) {
        setPreview(false);
      }
    } else if (nodePreview == true && scrollDownStatus == true && props.Hierarchy.length > 1) {
      console.log("step up");
      const StepUpHierarchy = props.Hierarchy.slice(0,-1);
      props.HierarchySetter(StepUpHierarchy);
      const stepUpDefaultNodeSelect = [...StepUpHierarchy, 1];
      props.NodeSelector(stepUpDefaultNodeSelect);
      updateFoundObject();
      if (nodePreview === true) {
        setPreview(false);
      }
    }
  };

  //Handle scroll logic.
  const handleScroll = (event) => {
    try {
      if (event.deltaY < 0) {
        setScrollingUp(true);
        setScrollingDown(false);
      } else if (event.deltaY === 0) {
        // setScrollingUp(false);
      } else if (event.deltaY > 0) {
        setScrollingDown(true);
        setScrollingUp(false);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  //Store the user-selected node, used for reference when adding new nodes.
  const [foundObject, setFoundObject] = useState(
    props.jobs[props.SelectedJob].tree[0]
  );
  useEffect(() => {
    const foundObjectSetter = props.jobs[props.SelectedJob].tree.find(
      (obj) =>
        obj.nodeID.length === props.SelectedNode.length &&
        obj.nodeID.every(
          (nodeID, index) => nodeID === props.SelectedNode[index]
        )
    );
    setFoundObject(foundObjectSetter);
  }, [props.SelectedNode]);

  const updateFoundObject = () => {
    const foundObjectSetter = props.jobs[props.SelectedJob].tree.find(
      (obj) =>
        obj.nodeID.length === props.SelectedNode.length &&
        obj.nodeID.every(
          (nodeID, index) => nodeID === props.SelectedNode[index]
        )
    );
    setFoundObject(foundObjectSetter);
  };

  //Filter through the user-selected job, storing elements that are in the user's current hierarchy. Used for displaying nodes.
  const displayedHierarchy = props.jobs[props.SelectedJob].tree.filter(
    (obj) => obj.hierarchy.join("") === props.Hierarchy.join("")
  );

  console.log("-----------------------");
  console.log(
    "========The current Hierarcy is:" + props.Hierarchy + "========"
  );

  return (
    <div>
      <div className="nodeWindowBorder"></div>
      <div className="nodeContainer" onClick={getMouseEventOptions}>
        {props.JobSelectStatus &&
          displayedHierarchy.map((obj) => (
            <div
              key={obj.id}
              className="box text"
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
                handleHierarchyShift(
                  Preview,
                  ScrollingUp,
                  PreviewID,
                  ScrollingDown
                );
              }}
            >
              {obj.subject}
            </div>
          ))}
      </div>

      {Preview && (
        <div className="previewBox text">
          {previewObject.subject}'s objective: {previewObject.objective}
        </div>
      )}

      <div className="info">
        <div className="textHeader">Node Info</div>
        <div className="nodeInfoText">
          <div className="textSubHeader">Subject: {foundObject.subject}</div>
          <br />
          <div className="textSubHeader">ID: {foundObject.nodeID}</div>

          <p className="textSubHeader">Objective: {foundObject.objective}</p>
          <input
            type="Objective"
            value={userInput}
            onChange={handleNodeObjective}
            className="nodeInfoInput"
            placeholder="Enter the objective, what do you aim to achieve here?"
          />
          <p className="textSubHeader">Planning: {foundObject.plan}</p>
          <input
            type="Objective"
            value={userInputPlan}
            onChange={handleNodePlan}
            className="nodeInfoInput"
            placeholder="Enter the plan: Can I define some tasks to reach this objective? Can I create a schedule? Can I allocate resources? Can I set some milestones?"
          />
          <p className="textSubHeader">
            Collaboration: {foundObject.collaboration}
          </p>
          <input
            type="Objective"
            value={userInputCollaboration}
            onChange={handleNodeCollaboration}
            className="nodeInfoInput"
            placeholder="Can I leverage an internal resource?"
          />
          <p className="textSubHeader">
            Communication: {foundObject.communication}
          </p>
          <input
            type="Objective"
            value={userInputCommunication}
            onChange={handleNodeCommunication}
            className="nodeInfoInput"
            placeholder="Please post the latest updates, any changes, improvements, issues? What are we working on right now?"
          />
          <p className="textSubHeader">Risk Management: {foundObject.risk}</p>
          <input
            type="Objective"
            value={userInputRisk}
            onChange={handleNodeRisk}
            className="nodeInfoInput"
            placeholder="Enter possible risks: Are there any potential risks that I can foresee at this point in time?"
          />
        </div>
      </div>

      <button className="addNodeBox" onClick={handleAddNode}>
        Add Node
      </button>
      <button
        className="updateNodeBox"
        onClick={() => {
          handleObjectiveUpdate(userInput);
          handlePlanUpdate(userInputPlan);
          handleCollaborationUpdate(userInputCollaboration);
          handleCommunicationUpdate(userInputCommunication);
          handleRiskUpdate(userInputRisk);
          updateFoundObject();
        }}
      >
        Update Node
      </button>
    </div>
  );
}
export default Node;
