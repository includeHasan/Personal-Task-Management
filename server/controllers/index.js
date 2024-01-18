var User =require('../model/user')
var Task=require('../model/task')
var bcrypt=require('bcrypt')
var bodyParser=require('body-parser')
var jwt=require('jsonwebtoken')
const { sendTokenAsCookie } = require('../middleWare/auth')
var secretKey="hasan"


let register=async(req,res)=>
{
   try{ 
    let {email,password,username}=req.body;
 let existingUser=await User.findOne({$or:[{username},{password}]})
 if(existingUser)
 {
    return res.status(400).json({error:"user already exist of this username or email"})
 }
 let hashedPassword=await bcrypt.hash(password,10)
 let createdUser=await User.create({
    email:email,
    username:username,
    password:hashedPassword,

 })
 res.status(201).json({message:"registerd sucessfully",success:true,
 data:createdUser})

}catch(err){
    res.status(500).json({error:"internal server error",success:false})
}
}


let signIn=async (req, res) =>
 {
   try {
     const { username, password } = req.body;
 
    
     const user = await User.findOne({ username });
     console.log(user.password)
     if (!user) {
       return res.status(401).json({ message: 'Invalid credentials',success:false });
     }
 
     const passwordMatch = await bcrypt.compare(password, user.password);
     if (!passwordMatch) {
       return res.status(401).json({ message: 'Invalid credentials',success:false});
     }
 

     const token = jwt.sign({ userId: user._id }, 'hasan', { expiresIn: '1h' });
     sendTokenAsCookie(res,token)
    
     res.status(200).json({ message: 'Login successful',success:true });
   } catch (error) {
     res.status(500).json({ error: 'Internal Server Error' });
   }
 };




let createTask= async (req, res) => 
{
   try {
     const { title, description} = req.body;
 
     const newTask = new Task({
       title,
       description,
 
       user: req.userData.userId,
     });
 
     await newTask.save();
     
    // Add the new task's _id to the tasks array in the user document
    await User.findByIdAndUpdate(req.userData.userId, { $push: { tasks: newTask._id } });
 
     res.status(201).json({ message: 'Task created successfully' });
   } catch (error) {
    console.log(error)
     res.status(500).json({ error: 'Internal Server Error' });
   }
 }




 let specificUserTask= async (req, res) => 
 {
   try {
     // Retrieve tasks for the authenticated user
     const tasks = await Task.find({ user: req.userData.userId });
 
     res.status(200).json(tasks);
   } catch (error) {
     res.status(500).json({ error: 'Internal Server Error' });
   }
 }


 let changeStatus=async (req,res)=>
 {
   try {
     const taskId=req.params.taskId
     const data=await Task.findById(taskId)
     console.log(data)
    const update=await Task.updateOne({_id:taskId},{$set:{completed:!data.completed}})
    console.log(update)
  
    res.status(200).json({ message: ' successful updated',success:true });
   } 
   catch (error) {
     res.status(500).json({ error: 'Internal Server Error' });
   }
 }

 
 let deleteTask= async (req, res) =>
  {
   try {
     const taskId = req.params.taskId;
 
     // Check if the task exists
     const task = await Task.findById(taskId);
     if (!task) {
       return res.status(404).json({ error: 'Task not found' });
     }
 
     // Check if the task belongs to the authenticated user
     if (task.user.toString() !== req.userData.userId) {
       return res.status(403).json({ error: 'Unauthorized: Task does not belong to the user' });
     }
 
     // Delete the task
     await Task.findByIdAndDelete(taskId);
 
     res.status(200).json({ message: 'Task deleted successfully' });
   } catch (error) {
     res.status(500).json({ error: 'Internal Server Error' });
   }
 }

 let editTask=async (req, res) => {
   try {
     const taskId = req.params.taskId;
     const { title, description,  completed } = req.body;
 
    
     const task = await Task.findById(taskId);
     if (!task) {
       return res.status(404).json({ error: 'Task not found' });
     }
 
     // Check if the task belongs to the authenticated user
     if (task.user.toString() !== req.userData.userId) {
       return res.status(403).json({ error: 'Unauthorized: Task does not belong to the user' });
     }
 
     // Update the task
     await Task.findByIdAndUpdate(taskId, {
       title,
       description,
       
       completed,
     });
 
     res.status(200).json({ message: 'Task updated successfully' });
   } catch (error) {
     res.status(500).json({ error: 'Internal Server Error' });
   }
 }


 let allTask=async (req, res) => {
   try {
    
     const tasks = await Task.find();
 
     res.status(200).json(tasks);
   } catch (error) {
     res.status(500).json({ error: 'Internal Server Error' });
   }
 }

module.exports={register,signIn,createTask,specificUserTask,deleteTask,editTask,allTask,changeStatus}