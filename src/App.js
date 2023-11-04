import logo from "./logo.svg";
// import "./App.css";
import "./components/Node.js";
import "./index.css";
import React, { useState, useEffect } from "react";
import Node from "./components/Node";
import Job from "./components/Job";
import "./output.css";
import { motion } from "framer-motion";
/************************************   Author   *********************************************
 * Created by: George Dobric                                                                 *
/**********************************   Description   ******************************************
 * The intention of this application is to create a simple yet effective project management  *
 * tool. The two components which make up this program are Job and Node. User projects can   *
 * be added under 'Jobs' and project tasks can be entered under 'Nodes.' Each node contains  *
 * the following user-entered data: Objective, Planning, Collaboration, Communication, and   *
 * Risk Management. By compartmentalizing these key aspects of project management to each    *
 * minute project task, powerful insights can be collected. Moreover, the user can 'step'    *
 * up or down from nodes, creating embedded nodes and establishing hierarchies. This creates *
 * a clear map of the project which is easy to navigate, from its highest conceptual levels  *
 * to its lowest technical levels.                                                           *
 ********************************************************************************************/
function App() {
  const [Jobs, setJobs] = useState([
    {
      id: 1,
      title: "Ticket",
      tree: [
        {
          nodeID: [1, 1],
          hierarchy: [1],
          subject: "Root",
          objective: "",
          plan: "",
          communication: "",
          collaboration: "",
          risk: "",
        },
      ],
    },
  ]);
  const [SelectedJob, setSelectedJob] = useState(0);
  let [SelectedNode, setSelectedNode] = useState([1, 1]);
  const [Hierarchy, setHierarchy] = useState([1]);
  const [JobSelectStatus, setJobSelectStatus] = useState(false);
  const [NoJobSelection, setNoJobSelection] = useState(true);
  const [stepDownAfterNodeSelect, setStepDownAfterNodeSelect] = useState(false);
  // const [clearNodeInputFields, setClearNodeInputFields] = useState(false)
  const [clearDisplayedAncestors, setClearDisplayedAncestors] = useState(false);
  const [newFoundObject, setNewFoundObject] = useState(Jobs[0].tree[0]);

  //Store the user's selected job.
  const JobSelector = (id) => {
    setSelectedJob(id);
    setJobSelectStatus(true);
    setNoJobSelection(false);
    // setClearNodeInputFields(true);
    setClearDisplayedAncestors(true);
    const newObj = Jobs[SelectedJob].tree[0];
    setNewFoundObject(newObj);
    console.log("The selected job is: ", SelectedJob);
    setSelectedNode([1,1]);
    setHierarchy([1]);
  };

  const clearDisplayedAncestorsHandler = () => {
    setClearDisplayedAncestors(false);
  }

  //Add new jobs entered by the user.
  const JobModifier = (obj) => {
    const updatedJob = [...Jobs, obj];
    setJobs(updatedJob);
  };

  const JobTitleModifier = (obj) => {
    // const updatedJob = Jobs[SelectedJob];
    // updatedJob.title = obj;
    Jobs[SelectedJob].title = obj;
  }

  const handleStepDownAfterNodeSelect = (state) => {
    setStepDownAfterNodeSelect(state);
  };

  //Store the user's selected node, passing the node's nodeID.
  const NodeSelector = (id) => {
    let updatedNodeSelect = id;
    setSelectedNode(updatedNodeSelect);
    return SelectedNode;
  };

  //Add new nodes entered by the user to the current job.
  const NodeModifier = (obj) => {
    const updatedTree = [...Jobs[SelectedJob].tree, obj];
    const updatedJobs = [...Jobs];
    updatedJobs[SelectedJob].tree = updatedTree;
    setJobs(updatedJobs);
  };

  //Node input update functions, called by handlers in the Node component.
  const NodeObjectiveModifier = (event) => {
    const index = Jobs[SelectedJob].tree.findIndex(
      (node) =>
        node.nodeID.length === SelectedNode.length &&
        node.nodeID.every((nodeID, index) => nodeID === SelectedNode[index])
    );
    const updatedNodeObjective = [
      ...Jobs[SelectedJob].tree.slice(0, index),
      {
        ...Jobs[SelectedJob].tree[index],
        objective: event,
      },
      ...Jobs[SelectedJob].tree.slice(index + 1),
    ];

    const updatedJobs = [...Jobs];
    updatedJobs[SelectedJob].tree = updatedNodeObjective;
    setJobSelectStatus(updatedJobs);
  };

  const NodePlanModifier = (event) => {
    const index = Jobs[SelectedJob].tree.findIndex(
      (node) =>
        node.nodeID.length === SelectedNode.length &&
        node.nodeID.every((nodeID, index) => nodeID === SelectedNode[index])
    );
    const updatedNodePlan = [
      ...Jobs[SelectedJob].tree.slice(0, index),
      {
        ...Jobs[SelectedJob].tree[index],
        plan: event,
      },
      ...Jobs[SelectedJob].tree.slice(index + 1),
    ];

    const updatedJobs = [...Jobs];
    updatedJobs[SelectedJob].tree = updatedNodePlan;
    setJobSelectStatus(updatedJobs);
  };

  const NodeCollaborationModifier = (event) => {
    const index = Jobs[SelectedJob].tree.findIndex(
      (node) =>
        node.nodeID.length === SelectedNode.length &&
        node.nodeID.every((nodeID, index) => nodeID === SelectedNode[index])
    );
    const updatedNodePlan = [
      ...Jobs[SelectedJob].tree.slice(0, index),
      {
        ...Jobs[SelectedJob].tree[index],
        collaboration: event,
      },
      ...Jobs[SelectedJob].tree.slice(index + 1),
    ];

    const updatedJobs = [...Jobs];
    updatedJobs[SelectedJob].tree = updatedNodePlan;
    setJobSelectStatus(updatedJobs);
  };

  const NodeCommunicationModifier = (event) => {
    const index = Jobs[SelectedJob].tree.findIndex(
      (node) =>
        node.nodeID.length === SelectedNode.length &&
        node.nodeID.every((nodeID, index) => nodeID === SelectedNode[index])
    );
    const updatedNodePlan = [
      ...Jobs[SelectedJob].tree.slice(0, index),
      {
        ...Jobs[SelectedJob].tree[index],
        communication: event,
      },
      ...Jobs[SelectedJob].tree.slice(index + 1),
    ];

    const updatedJobs = [...Jobs];
    updatedJobs[SelectedJob].tree = updatedNodePlan;
    setJobSelectStatus(updatedJobs);
  };

  const NodeRiskModifier = (event) => {
    const index = Jobs[SelectedJob].tree.findIndex(
      (node) =>
        node.nodeID.length === SelectedNode.length &&
        node.nodeID.every((nodeID, index) => nodeID === SelectedNode[index])
    );
    const updatedNodePlan = [
      ...Jobs[SelectedJob].tree.slice(0, index),
      {
        ...Jobs[SelectedJob].tree[index],
        risk: event,
      },
      ...Jobs[SelectedJob].tree.slice(index + 1),
    ];

    const updatedJobs = [...Jobs];
    updatedJobs[SelectedJob].tree = updatedNodePlan;
    setJobSelectStatus(updatedJobs);
  };

  const NodeIDModifier = (event) => {
    const index = Jobs[SelectedJob].tree.findIndex(
      (node) =>
        node.nodeID.length === SelectedNode.length &&
        node.nodeID.every((nodeID, index) => nodeID === SelectedNode[index])
    );
    const updatedJobs = [...Jobs];

    updatedJobs[SelectedJob].tree[SelectedNode].nodeID = event;
    setJobs(updatedJobs);
  };

  //Store the user's current heirarchy, used for filtering the displayed nodes,
  //  determined by the currently selected node's nodeID array minus its last element.
  const HierarchySetter = (newHierarchy) => {
    setHierarchy(newHierarchy);
  };

  const [InfoPreviewStatus, setInfoPreviewStatus] = useState(false);
  const infoPreviewHandler = (status) => {
    setInfoPreviewStatus(status);
  };

  //Input handlers
  const [userInput, setUserInput] = useState("");
  const handleSearch = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div>
      <div
        class="fixed mx-auto w-1/4  bg-purple-400 border-4 border-black z-50 text-center text-black rounded-full top-1"
        onMouseEnter={() => infoPreviewHandler(true)}
        onMouseLeave={() => infoPreviewHandler(false)}
      >
        Project Management Tool - hover here for info
      </div>
      {InfoPreviewStatus && (
        <div class="fixed z-50 text-yellow-200 text-center rounded-lg w-1/4 bg-gray-500 bg-transparent left-1/4 animate-pulse">
          To enter a node, hover your cursor over it and scroll up. To exit a
          node, hover your cursor over any node and scroll down.
        </div>
      )}
      <input
        type="Search"
        value={userInput}
        onChange={handleSearch}
        class="bg-green-300 text-black bold mx-auto rounded-full border-4 border-black ml-56 w-1/2 text-center"
        placeholder="Search through your jobs and nodes..."
      />
      <br></br>
      <div>
        <Job
          jobs={Jobs}
          JobSelector={JobSelector}
          SelectedJob={SelectedJob}
          JobSelectStatus={JobSelectStatus}
          NoJobSelection={NoJobSelection}
          JobModifier={JobModifier}
          JobTitleModifier={JobTitleModifier}
        ></Job>
      </div>

      <div class="z-50 bg-green-400 border-4 border-black w-1/4 left-1/4 rounded-full absolute top-1/2">
        <div class="font-bold font-sans text-lg order-1 text-center text-black p-1 ">
          Jobs
        </div>
      </div>

      <br></br>
      <div class="h-full">
        <Node
          class="z-0"
          jobs={Jobs}
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
          HierarchySetter={HierarchySetter}
          stepDownAfterNodeSelect={stepDownAfterNodeSelect}
          handleStepDownAfterNodeSelect={handleStepDownAfterNodeSelect}
          clearDisplayedAncestors={clearDisplayedAncestors}
          clearDisplayedAncestorsHandler={clearDisplayedAncestorsHandler}
          newFoundObject={newFoundObject}
        ></Node>
      </div>
      {/* <div class="z-50 bg-green-300 p-3 rounded-full left-1/2 bottom-1/4 absolute border-4 border-purple-300 w-1/12 text-center text-2xl">
        🖐️
      </div> */}
      <div class="z-50 bg-green-400 border-4 border-black w-1/4 mt-1/2 rounded-full right-1/4 text-center absolute content-center top-1/2">
        <div class=" font-bold font-sans text-lg order-1 text-black flex relative p-1 left-1/4">
          Nodes
        </div>
      </div>
    </div>
  );
}

export default App;
