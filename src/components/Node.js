import React, { useState, useEffect, useRef } from "react";
import "./Node.css";
import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import { motion, useAnimation } from "framer-motion";

function Node(props) {
  const [Preview, setPreview] = useState(false);
  const [PreviewID, setPreviewID] = useState(0);
  const [ScrollingUp, setScrollingUp] = useState(false);
  const [ScrollingDown, setScrollingDown] = useState(false);
  const [previewObject, setPreviewObject] = useState(
    props.jobs[props.SelectedJob].tree[0]
  );
  const [addNodeClickStatus, setAddNodeClickStatus] = useState();

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

  const handleAddNodeClick = () => {
    setAddNodeClickStatus(true);
    setTimeout(() => {
      handleAddNode();
      setAddNodeClickStatus(false);
    }, 200)
  }
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
    // nodeInfoHierarchyDisplay(props.SelectedNode);
    nodeInfoHierarchyDisplay();
  };

  //Input Handlers:
  const [userInputObjective, setUserInputObjective] = useState("");
  const handleNodeObjective = (event) => {
    setUserInputObjective(event.target.value);
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

  function clearInput () {
    setUserInputObjective('');
    setUserInputPlan('');
    setUserInputCollaboration('');
    setUserInputCommunication('');
    setUserInputRisk('');
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
    clearInput();
  };

  //Called when the user scrolls up while previewing a node. Prompts the user to enter a child node.
  const handleAddNestedNode = () => {
    const newID = [...previewObject.nodeID, 1];
    props.HierarchySetter(previewObject.nodeID);
    const newHierarchy = [...previewObject.nodeID];
    const isNotNullSteppDownCheck = props.jobs[props.SelectedJob].tree.filter(
      (obj) => obj.nodeID.join("") === newID.join("")
    );
    if (isNotNullSteppDownCheck.length < 1) {
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
  async function handleHierarchyShift(
    nodePreview,
    scrollUpStatus,
    nodeID,
    scrollDownStatus
  ) {
    if (nodePreview == true && scrollUpStatus == true) {
      console.log("step down");
      handleNodeSelect(nodeID);
      handleAddNestedNode();
      if (nodePreview === true) {
        setPreview(false);
      }
    } else if (
      nodePreview == true &&
      scrollDownStatus == true &&
      props.Hierarchy.length > 1
    ) {
      console.log("step up");
      const StepUpHierarchy = props.Hierarchy.slice(0, -1);
      props.HierarchySetter(StepUpHierarchy);
      const stepUpDefaultNodeSelect = [...StepUpHierarchy, 1];
      props.NodeSelector(stepUpDefaultNodeSelect);
      updateFoundObject();
      if (nodePreview === true) {
        setPreview(false);
      }
    }
  }

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

  //display the node hierarchy in node info
  //Filter through the user-selected job, storing elements that are parents of the user-selected node, including the selected node. Used for the nodeID display.
  const displayedAncestors = props.SelectedNode !== undefined ? [props.jobs[props.SelectedJob].tree[0]] : [props.jobs[0].tree[0]];
  // let ancestorID = displayedAncestors !== undefined ? displayedAncestors.nodeID : [1,1];
  let ancestorID = foundObject !== undefined && foundObject.hierarchy.length >= 2 ? [...foundObject.hierarchy] : [1,1];

  const nodeInfoHierarchyDisplay = () => {
    if (ancestorID.length >= 2){
    for (let i = 0; i < ancestorID.length; i++) {
      if (ancestorID.length >=3){
      displayedAncestors.push(props.jobs[props.SelectedJob].tree.find(
        (obj) => obj.nodeID.join("") === ancestorID.join("")
      ));
    }

    else if (ancestorID.length ==2){
      displayedAncestors.push(props.jobs[props.SelectedJob].tree.find(
        (obj) => obj.nodeID.join("") === ancestorID.join("")
      ));
    }
    
    
      ancestorID.pop();
    }
  }
  }
  // nodeInfoHierarchyDisplay(props.SelectedNode);
  nodeInfoHierarchyDisplay();

  // function nodeInfoHierarchyDisplay(nodeID) {
  //   ancestorID.pop();
  //   const parent = props.jobs[props.SelectedJob].tree[ancestorID];
  //   displayedAncestors.push(parent);
  //   return function () {
  //     return nodeID.slice();
  //   };
  // }
  
  // const myArray = [1, 2, 3, 4, 5];
  // const removeLast = sliceAndRemoveLast(myArray);
  
  // console.log(myArray); // This will log [1, 2, 3, 4, 5], preserving the original state.
  
  // const newArray = removeLast();
  // console.log(newArray); // This will log [1, 2, 3, 4], as it's the result of calling the returned function.
  

  return (
    <div>
      <div class="h-full">
        <div class=" z-50 grid grid-cols-2 grid-auto-rows gap-4 opacity-80 bg-grey-300 fixed w-full h-1/3 mx-auto border-4 bg-green-300 border-gray-800 p-3 top-16 right-0 rounded-lg overflow-auto">
          <div class="text-xl text-white font-bold fixed top-20 text-center w-full underline row-start-1">
            Node Info
          </div>
          <div class="row-start-2 col-start-2  w-full text-right text-white text-lg p-11 font-serif font-bold">
          <div>Selected Node Hierarchy</div>
          
          {foundObject.nodeID.length >= 2 && displayedAncestors.map((obj) => (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                // key={obj.id}
                class="bg-blue-400 text-white text-center border-4 border-pink-300 rounded-full w-2/3"
                //className="text-white text-center h-min whitespace-nowrap bg-blue-400 border-4 border-pink-300 p-3 rounded-full w-2/3 mx-auto mb-2 top-1  relative"
                // onMouseEnter={() => {
                //   handleMouseEnter(obj.nodeID);
                // }}
                // onMouseLeave={() => {
                //   handleMouseLeave();
                // }}
                // onClick={() => {
                //   handleNodeSelect(obj.nodeID);
                // }}
                // onWheel={() => {
                //   handleHierarchyShift(
                //     Preview,
                //     ScrollingUp,
                //     PreviewID,
                //     ScrollingDown
                //   );
                // }}
              >
                {obj.subject}
              </motion.button>
              ))}
            </div>

          <div class="z-0 row-start-2 col-start-1">
            <div className="textSubHeader">Subject: {foundObject.subject}</div>

            <p className="textSubHeader">Objective: {foundObject.objective}</p>
            <input
              type="Objective"
              value={userInputObjective}
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

        <div
          class="z-50  bg-yellow-300 border-4 border-blue-300 rounded-xl  h-1/2 w-5/12 top-1/2 right-5 overflow-auto overflow-nowrap flex flex-col fixed"
          onClick={getMouseEventOptions}
        >
          {props.JobSelectStatus &&
            displayedHierarchy.map((obj) => (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                key={obj.id}
                className="text-white text-center h-min whitespace-nowrap bg-blue-400 border-4 border-pink-300 p-3 rounded-full w-2/3 mx-auto mb-2 top-1  relative"
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
              </motion.button>
            ))}
        </div>
      </div>
      <button
        class={addNodeClickStatus ? 'bg-purple-300 z-50 p-4 w-1/5 rounded-full border-4 border-black absolute bottom-1/2 right-2 transform transition-transform duration-300 hover:scale-90' : 'bg-red-300 hover:bg-purple-300 z-50 p-4 w-1/5 rounded-full border-4 border-black absolute bottom-1/2 right-2 transform transition-transform duration-300 hover:scale-105'}
        onClick={handleAddNodeClick}
      >
        ➕
      </button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        class="z-50 bg-red-300 border-4 border-black text-white text-center top-20 fixed rounded-full right-10 p-4"
        onClick={() => {
          handleObjectiveUpdate(userInputObjective);
          handlePlanUpdate(userInputPlan);
          handleCollaborationUpdate(userInputCollaboration);
          handleCommunicationUpdate(userInputCommunication);
          handleRiskUpdate(userInputRisk);
          updateFoundObject();
        }}
      >
        Update Node
      </motion.button>

      {Preview && (
        <div class="z-50 fixed bg-green-300 border-4 border-blue-300 rounded-full top-2/3 right-80">
          {previewObject.subject}'s objective: {previewObject.objective}
        </div>
      )}
    </div>
  );
}
export default Node;
