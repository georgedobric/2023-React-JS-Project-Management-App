import React, { useState, useEffect, useRef } from "react";
import "./Node.css";
import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";

function Node(props) {
  const handleAddNode = () => {
    const newNode = {id:props.jobs[props.SelectedJob].tree.length+1, subject:prompt('Enter a node subject'), };
    props.NodeModifier(newNode);
  }

  const handleNodeSelect = (id) => {
    props.NodeSelector(id);
  }

  const [userInput, setUserInput] = useState('');
  const handleNodeObjective = (event) => {
    setUserInput(event.target.value);
  }

  const [userInputPlan, setUserInputPlan] = useState('');
  const handleNodePlan = (event) => {
    setUserInputPlan(event.target.value);
  }

  const handleObjectiveUpdate = (objective) => {
    props.NodeObjectiveModifier(objective);
    //props.jobs[props.SelectedJob].tree[props.SelectedNode].objective
  }

  const handlePlanUpdate = (objective) => {
    props.NodePlanModifier(objective);
  }

  return (
    <div>
    <div className='nodeWindowBorder'></div>
      <div className="nodeContainer" onClick={getMouseEventOptions}>
      {props.JobSelectStatus && props.jobs[props.SelectedJob].tree.map((obj) => (
        <div key={obj.id}
        className='box text'
        onClick={() => {
          handleNodeSelect(obj.id - 1);
        }}>
          {obj.subject}
      </div>
      ))}
    </div>

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
        </div>
        </div>

    <button class='addNodeBox' onClick={handleAddNode}>Add Node</button>
    <button class='updateNodeBox' onClick={()=> {handleObjectiveUpdate(userInput); handlePlanUpdate(userInputPlan)}}>Update Node</button>


    </div>
  );
}
export default Node;


