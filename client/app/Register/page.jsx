"use client"
import React, { useState } from 'react';
import axios from 'axios';
const page = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    
  const handleSubmit =async (e) => {
    e.preventDefault()
   let data= {username,email,password}
   try {

     let submit=await axios.post("http://localhost:5000/api/register",data)
     console.log(submit.data.message)
   let message=submit.data.message
      
         alert(message);
      
   } catch (error) {
    alert("sorry you are not registered please try again")
    console.log("reason ",error)
   }
  };

  return (
    <div className="flex justify-center items-center min-h-screen dark:bg-slate-800 bg-gray-100">
      <div className="  bg-white p-8 rounded shadow-md w-full dark:bg-slate-400 sm:w-96">
        <h2 className="text-2xl text-center font-semibold mb-6">Register</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 bg-slate-100 border rounded-xl"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 bg-slate-100 border rounded-xl"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 bg-slate-100 border rounded-xl"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-2xl hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
