import React from 'react';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="bg-cover bg-center h-screen relative shadow-xl overflow-y-hidden" style={{ backgroundImage: `url('https://images.hdqwalls.com/wallpapers/blue-dark-yellow-abstract-artistic-4k-hw.jpg')` }}>
      {/* Background Image */}
      <div className="">
        <h1 className='text-center bg-black text-white font-bold text-3xl py-10 bg-slate-100 bg-opacity-20 backdrop-filter backdrop-blur-lg '>Personal Task Management</h1>
      </div>
      <div className="absolute inset-0 bg-cover bg-center shadow-inner"></div>

      {/* Glassy Blur Box */}
      <div className="flex items-center justify-center h-full">
        <div className="bg-slate-100 bg-opacity-20 backdrop-filter backdrop-blur-lg p-12 rounded-lg shadow-xl">
          <div className='bg-slate-100 bg-opacity-50'>
            <Link
              className='m-2 flex text-white py-2 px-8 text-3xl justify-center hover:glow-btn hover:bg-white  hover:text-black transition duration-300'
              href='/Login'
            >
              LOGIN
            </Link>
          </div>
          <div className='bg-slate-100  bg-opacity-50'>
            <Link
              className='m-2 mt-4 flex text-white py-2 px-12 text-3xl hover:glow-btn hover:bg-white hover:text-black transition duration-300'
              href='/Register'
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
