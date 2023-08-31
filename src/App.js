import logo from "./logo.svg";
import "./App.css";
import "./components/Node.js";
import React, { useState, useEffect } from "react";
import Node from "./components/Node";
import Job from "./components/Job";
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

  //Store the user's selected job.
  const JobSelector = (id) => {
    setSelectedJob(id);
    setJobSelectStatus(true);
    setNoJobSelection(false);
    console.log("The selected job is: ", SelectedJob);
  };

  //Add new jobs entered by the user.
  const JobModifier = (obj) => {
    const updatedJob = [...Jobs, obj];
    setJobs(updatedJob);
  };

  //Store the user's selected node, passing the node's nodeID.
  const NodeSelector = (id) => {
    let updatedNodeSelect = id;
    setSelectedNode(updatedNodeSelect);
    console.log("The selected job is: ", SelectedNode);
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

  return (
    <div>
      <div class="titleFont">Symbio.sys</div>
      <br></br>
      <div class="jobBar">
        <div class="jobFont">Jobs</div>
        <Job
          jobs={Jobs}
          JobSelector={JobSelector}
          SelectedJob={SelectedJob}
          JobSelectStatus={JobSelectStatus}
          NoJobSelection={NoJobSelection}
          JobModifier={JobModifier}
        ></Job>
      </div>
      <br></br>
      <div class="nodeBar">
        <div class="nodeFont">Nodes</div>
        <Node
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
        ></Node>
      </div>
    </div>
  );
}

export default App;
