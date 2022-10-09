const express=require('express');
const app=express();
const router=express.Router();
const db=require('../models/index');
const {task}=db;
app.use(express.json());

router.post('/',async (request,response)=>{
    const {empId} =request.query;
    const {tasks} = request.body;
    const createTask=await task.create({
        eId:empId,
        tasks:tasks,
        date:new Date(),
        Mstatus:'Pending',
        Astatus:'Pending'
    })
    if(!createTask){
        response.status(400).json({
            success:false,
            message:"Task hasn't inserted"
        })
    }
    else{
        response.status(200).json({
            success:true,
            message:"Task has inserted successfully"
        })
    }
})

module.exports=router;