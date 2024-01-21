"use client"
import axios from 'axios'
import React, { useEffect, useState,useCallback } from 'react'
import Card from '@/components/Card'
const page = () => {
const [title, settitle] = useState("")
const [description, setdescription] = useState("")
const [allTask, setallTask] = useState([])


const submitHandler = useCallback(async (e) => {
  e.preventDefault();

  try {
    const data = {title, description};
    let submit = await axios.post('http://localhost:5000/api/tasks', { title, description }, { withCredentials: true });
    console.log('send:', submit);

    // Directly update state with the newly added task
    setallTask(prevTasks => [...prevTasks, submit.data]);
  } catch (error) {
    alert('error check console');
    console.log(error);
  }
}, [title, description]);




const fetchData =async () => {
  try {
    let response = await axios.get("http://localhost:5000/api/task", { withCredentials: true });
    setallTask(response.data);
    console.log("data:", response);
  } catch (error) {
    console.log(error);
  }
}

useEffect(() => {
  const timer = setTimeout(() => {
     fetchData();
  }, 1000);
 
  return () => clearTimeout(timer);
 }, [fetchData, allTask]);
  return (
    <div>
     <h1 
     className="text-center text-3xl font-semibold bg-black py-8 text-white"
     
     >Task Board</h1>
     <div className=" mt-5 flex ">
      <form className='' >
        <div className="m-4 inline">
        <label className="mr-4 max-md:hidden">TASK:</label>
        <input type="text" placeholder='Task' 
        className='border-2 rounded px-7 py-4'
        value={title}
        onChange={(e)=>{settitle(e.target.value)}}
        />
        </div>
        <div className="m-4 inline">
        <label className="mr-4 max-md:hidden">Description:</label>
        <input type="text" placeholder='Description' 
        className='border-2 rounded px-7 py-4'
        value={description}
        onChange={(e)=>{setdescription(e.target.value)}}
        />
        </div>
        <div className="m-4 inline">
         <button onClick={submitHandler}
         className='rounded-xl  bg-slate-500 px-9 text-2xl hover:bg-slate-700 max-md:p-4 hover:text-white   py-4'
         >Add</button>
        </div>
      </form>
    
     </div>
       <div className='flex flex-wrap justify-center  items-center'>
        {allTask.map((e)=>{
          return <Card key={e._id} value={e}/>
        })}
       </div>
    </div>
  )
}
