"use client"
import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';


import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from 'next/link';







export default function SignInSide() {

return (<div className="bg-slate-100">
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
           backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          //  background:'url(../public/Bg.png)',
           
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
           
          >
         
           
            <Box  className="bg-slate-100
            ">
            <div className="bg-black py-5 text-slate-200 font-semibold text-center text-2xl"
            >PERSONAL TASK MANAGEMENT </div>
            <div className="py-7 bg-slate-100  font-bold text-xl text-center">
             WELCOME TO OUR APP!!
            </div >
            <div className="block bg-slate-100   py-[10%] w-full">
                <div className='bg-slate-100'>
           <Link 
           className='bg-slate-700 m-4 flex text-white py-[8%] px-[30%] rounded-2xl text-5xl' href='/Login' >LOGIN</Link>
           </div>
           <div>
           <Link 
           className='bg-slate-700 m-4 mt-4 flex text-white py-[8%] px-[30%] rounded-2xl text-5xl' href='/Register' >Register</Link>
            </div>
            </div>
            </Box>
          </Box>
        </Grid>
      </Grid>
         </div>
 
  );
}