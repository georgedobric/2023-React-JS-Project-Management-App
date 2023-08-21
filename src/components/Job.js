import React, { useState, useEffect, useRef } from 'react';
import './Job.css'
import '../App.js'
import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";


function Job(props) {
  const handleJobSelect = (id) => {
    props.JobSelector(id);
  }

  const handleAddJob = () => {
    const newJob = {id:props.jobs.length + 1, title: prompt('Enter a job title'), tree:[ { id: 1, subject: 'Root' } ]};
    props.JobModifier(newJob);
  }

  return (
    <div>
      <div className='jobWindowBorder'></div>
      <div className="jobContainer" onClick={getMouseEventOptions}>
      <button class='addJobBox' onClick={handleAddJob}>Add Job</button>
        {props.jobs.map((obj) => (
          <div
            className='job text'
            key={obj.id}
            onClick={() => {
              handleJobSelect(obj.id - 1);
            }}>
            {obj.title}
          </div>
        ))}
      </div>
      {props.JobSelectStatus && <div className='selectStatus'>Selected Job: {props.SelectedJob + 1}</div>}
      {props.NoJobSelection && <div className='selectStatus'>Please select a job...</div>}
    </div>
  );
}

export default Job;


