"use client"

import React,{useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//https://www.msn.com/en-in/health/health-news/14-year-old-boarding-school-student-gives-birth-to-boy-didn-t-know-she-was-pregnant/ar-AA1mP3Ji?ocid=msedgntp&cvid=c18f36fbc31a4c6ca65fae3bfa614257&ei=61
const page = () => {

  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const router=useRouter()
  let loginHandler = async (e) => {
    e.preventDefault();

    let data = { username, password };
    try {
      let submit = await axios.post("http://localhost:5000/api/login", data, { withCredentials: true });
    

      if (submit.data.success) {
        // If successful, navigate to the Dashboard page
        router.push('/Dashboard');
      }
   
  if(!submit.response.data.success){
        toast.error('Invalid Credential', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
  <>
   <div className='flex justify-center items-center min-h-screen bg-gray-100'>
     <div className="bg-white p-8 rounded w-full  shadow-md sm:w-96">
      <h1 className="text-2xl font-semibold mb-6 ">LOGIN</h1>
      <form >
        <div className="mb-4">
         <label >UserName</label>
         <input type="text"
         className='border block w-full p-2 rounded-xl text-gray-800'
         onChange={(e) => setusername(e.target.value)}
              value={username}
              required
         />
        </div>
        <div className="mb-4">
         <label >Password</label>
         <input type="password"
         className='border block w-full p-2 rounded-xl text-gray-800'
         onChange={(e) => setpassword(e.target.value)}
         value={password}
         required
         />
        </div>
        <button className='bg-blue-500 p-2 rounded-2xl text-white text-2xl hover:bg-blue-600'
        onClick={loginHandler} 
        >login</button>
      
      </form>

     </div>

   </div>
   <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
   </>
  )
}

export default page