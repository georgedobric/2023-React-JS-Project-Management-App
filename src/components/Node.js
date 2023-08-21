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
          <div className="textSubHeader">Subject:</div>
          <br />
          {props.jobs[props.SelectedJob].tree[props.SelectedNode].subject}
          <br />
          <div className="textSubHeader">ID:</div>
          <br />
          {props.jobs[props.SelectedJob].tree[props.SelectedNode].id}
        </div>
        </div>

    <button class='addNodeBox' onClick={handleAddNode}>Add Node</button>

    </div>
  );
}
export default Node;


