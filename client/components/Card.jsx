// CardComponent.jsx
"use client"
import React, { useState } from 'react';
import axios from 'axios';


const CardComponent = (props) => {
  let data=props.value

  let deleteHandler=async(e)=>
  { e.preventDefault()
    
 try {
    let deletedData=await axios.delete(`http://localhost:5000/api/tasks/${data._id}`,{withCredentials:true})
    console.log(deletedData)
 } catch (error) {
  console.log(error)
 }
  }

let changeStatus=async(e)=>{
  e.preventDefault()
  console.log(data._id)
  try {
    const updatedStatus = !data.completed;
    let a=await axios.put(`http://localhost:5000/api/status/${props.value._id}`,{ completed: updatedStatus },{withCredentials:true})
    console.log(a)
  } catch (error) {
    console.log(error)
  }
}
 console.log("props:",props.value._id)

const statusText = data.completed ? 'Completed' : 'Pending';
  return (
    <div className="bg-white flex-row justify-center items-center shadow-md rounded-md m-2 text-black  p-6 max-w-sm mx-auto">
    <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
    <p className="text-gray-600 mb-4">{data.description}</p>
    <div className={`text-sm ${data.completed ? 'text-green-500 hover:text-green-700' : 'text-red-500 hover:text-red-700'}`}>
    Status: <button onClick={changeStatus}> {statusText}</button>
   </div>
   <button
   className='mt-2 text-center border rounded-xl p-2 bg-red-400 text-white hover:bg-red-500'
   onClick={deleteHandler}
   >delete</button>
  </div>
  );
};
export default CardComponent;
