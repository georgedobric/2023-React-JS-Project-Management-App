import React, { useState, useEffect, useRef } from "react";
// import "./Job.css";
import "../App.js";
// import "../output.css"
import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import { motion } from "framer-motion";

function Job(props) {
  //Store the user's selected job.
  const handleJobSelect = (id) => {
    props.JobSelector(id);
  };

  //Let the user  add a new job.
  const handleAddJob = () => {
    const newJob = {
      id: props.jobs.length + 1,
      title: prompt("Enter a job title"),
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
    };
    props.JobModifier(newJob);
  };

  return (
    <div>
      <div
        class="bg-yellow-300 border-4 border-blue-300 rounded-xl fixed h-1/2 w-5/12 top-1/2 left-5 overflow-auto overflow-nowrap flex flex-col flex-wrap"
        onClick={getMouseEventOptions}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          class=" bg-red-300 w-1/5 rounded-full border-4 border-black p-4 bottom-1/2 left-2/3 absolute z-10"
          onClick={handleAddJob}
        >
          ➕
        </motion.button>
        {props.jobs.map((obj) => (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            class="text-white text-center h-min whitespace-nowrap bg-blue-400 border-4 border-pink-300 p-3 rounded-full w-2/3 mx-auto mb-2 top-1  relative"
            key={obj.id}
            onClick={() => {
              handleJobSelect(obj.id - 1);
            }}
          >
            {obj.title}
          </motion.button>
        ))}
      </div>
      {props.JobSelectStatus && (
        <div class="bg-purple-300 rounded-full border-4 border-black p-1 bottom-10 left-1/4 fixed z-10">
          Selected Job: {props.SelectedJob + 1}
        </div>
      )}

      {props.NoJobSelection && (
        <div class="bg-purple-300 bottom-10 left-1/4 fixed rounded-full p-1 border-4 border-black z-50">
          Please select a job...
        </div>
      )}
    </div>
  );
}

export default Job;
