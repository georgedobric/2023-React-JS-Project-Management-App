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

  //Styling
  const [addJobClickStatus, setAddJobClickStatus] = useState();


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

  //Let the user  add a new job.
  const handleEditJob = () => {
    const newTitle = prompt("Enter a new job title:")
    props.JobTitleModifier(newTitle);
  };

  // const handleAddJobClick = () => {
  // setAddJobClickStatus(true);
  //   setTimeout(() => {
  //     handleAddJob();
  //     setAddJobClickStatus(false);
  //   }, 200);
  // }
  const addJobButtonVariants = {
    hover: {
      scale: 1.1,
      backgroundColor: '#9370DB',
      transition: {
        duration: 0.01,
      },
    },
    tap: {
      scale: 0.9,
      backgroundColor: '#9932CC',
      transition: {
        duration: 0.1,
      },
    },
  };

  const editJobButtonVariants = {
    hover: {
      scale: 1.1,
      backgroundColor: '#9370DB',
      transition: {
        duration: 0.01,
      },
    },
    tap: {
      scale: 0.9,
      backgroundColor: '#9932CC',
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <div>
      <motion.button
          // whileHover={{ scale: 1.1 }}
          // whileTap={{ scale: 0.9 }}
          // class=" bg-red-300 w-1/5 rounded-full border-4 border-black p-4 bottom-1/2 left-1/4 absolute z-10"
          // class="z-50 bg-red-300 border-4 border-black text-white text-center top-20 fixed rounded-full right-10 p-4"
          // class=" bg-red-300 border-4 border-black text-white text-center absolute rounded-full p-4 z-10 left-1/4 w-1/5"
          // class={
          //   addJobClickStatus
          //     ? "bg-purple-300 z-10 p-4 w-1/5 rounded-full border-4 border-black absolute bottom-1/2 left-1/4 transform transition-transform duration-300 hover:scale-90"
          //     : "bg-red-300 hover:bg-purple-300 z-10 p-4 w-1/5 rounded-full border-4 border-black absolute bottom-1/2 left-1/4 transform transition-transform duration-300 hover:scale-105"
          // }

          // onClick={handleAddJobClick}

          variants={addJobButtonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          className="bg-red-300 z-10 p-4 w-1/5 rounded-full border-4 border-black absolute bottom-1/2 left-1/4 transform transition-transform duration-300 hover:scale-90"
          onClick={handleAddJob}

        >
          ➕
        </motion.button>
        <motion.button
          variants={editJobButtonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          className="bg-red-300 z-10 p-4 w-1/4 rounded-full border-4 border-black absolute bottom-1/2 left-1/6 transform transition-transform duration-300 hover:scale-90"
          onClick={handleEditJob}
        >
        Edit Selected Job Title
        </motion.button>
      <div
        class="bg-yellow-300 border-4 border-blue-300 rounded-xl fixed h-1/2 w-5/12 top-1/2 left-5 overflow-auto overflow-nowrap flex flex-row flex-wrap"
        onClick={getMouseEventOptions}
      >
        
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
