var User =require('../model/user')
var taskModal=require('../model/task')
var express=require('express')
var router=express.Router();
var bcrypt=require('bcrypt')
var bodyParser=require('body-parser');
const { register, signIn, createTask, specificUserTask, deleteTask, editTask, allTask, changeStatus } = require('../controllers');
const { authenticateUser } = require('../middleWare/auth');
const Task=require('../model/task')

router.use(bodyParser.urlencoded({extended:true}))

router.post('/register',register)

router.post('/login',signIn)
 
router.post('/tasks', authenticateUser,createTask);

router.delete('/tasks/:taskId', authenticateUser,deleteTask);

router.put('/tasks/:taskId', authenticateUser, editTask);

router.get('/task', authenticateUser,specificUserTask);

router.get('/all-tasks', allTask);

 router.put('/status/:taskId',authenticateUser,changeStatus)

module.exports=router;