import React, { useState, useEffect, useRef } from 'react';
import './Job.css'
import '../App.js'

function Job({ job, setJob, sendDataToParent }) {
    //return (
        //now we need some code for a 'create new job' button
        //this will create a unique job object with its job properties such as:
        //job.type (char of P or T indicating project or ticket)
        //job.bev (this will be some kind of flow chart, node, graphical thing for the brids eye view)
        //job.node (this should probably point to a unique node object with its own props)
        //job.assignedTo (this will be a string OR, an array of ints which assigns the job to user(s))
        //job.dueDate (date)
        //job.status or job.active (bool yes or no)
        //job.budgetTotal (float 1 decimal)
        //job.budgedUsed (float 1 decimal)
        //job.selected (bool yes or no)
    //)

    //Create an array of job objects, expandable upon user input.
    ////const [job, setJob] = useState([{id:0, title:'root'}]);

    //Handle user-selected job click and send the selected job number to App.js
    const handleClick = (id) => {
        sendDataToParent(id);
      };

    //Track the user-selected job
    const [selectedJobNum, setSelectedJobNum] = useState(0);



    //Handles the 'add job' button, which expands the array.
    const handleAddObject = () => {

        //Stores the job id
        const jobID = job.length

        //Stores the job type
        //temporarily commented out
        //const jobType = prompt('Enter 1 to create a new ticket, and 2 to create a new project');

        //Stores the job title
        const userInputJobTitle = prompt("Enter the job title: ");

        //Create the new job object
        const newObject = {
            id: jobID,
            //termporarily commented out
            //type: jobType,
            title: userInputJobTitle,
            tree: {id: 0, subject: "Root"}
        }

        //Add the new job object to the job array
        setJob((prevArray) => [...prevArray, newObject]);
    };

    useEffect(() => {
        ////console.log(job); // Log the updated state on each re-render
        //console.log("the selected job is", selectedJobNum);
        setSelectedJobNum(selectedJobNum);
        ////edit 06.28.23 job.current = selectedJobNum;
        
      }, [job]);

    return(
        <div>
        <button className='addJobBox'onClick={handleAddObject}>Add Job</button>
        
        {job.map((obj) => (
            <div
                className='job text'
                key={obj.id}
                //Set the user-selected job number and send this data to App.js
                onClick={() => {
                    setSelectedJobNum(obj.id);
                    handleClick(obj.id);
                    console.log("the job length is: ")
                    console.log(job)
                  }}
                //style={{ backgroundColor: obj.id === selectedJob ? 'violet' : 'lightblue' }}
            >
                {obj.title}
            </div>
        ))}
        </div>
    );
}

export default Job;