const express=require('express');
const app=express();
const router=express.Router();
const db=require('../models/index');
const {task}=db;
app.use(express.json());

router.put('/',async (request,response)=>{
    const {taskId}=request.query;
    const {tasks}=request.body;
    console.log("tasks",tasks);
    //console.log("&&&&&",taskId)
    const updateTask=await task.update({tasks:tasks,Mstatus:'Pending',Astatus:'Pending'},{
        where:{
            id:taskId
        },
        attributes:['tasks']
    })
    console.log("updateTask",updateTask);
    if(updateTask[0]===1){
        response.status(200).json({
            success:true,
            message:"Task updated successfully"
        })
    }
    else{
        response.status(400).json({
            success:false,
            message:`Task id ${taskId} doen't exists`
        })
    }
})

module.exports=router;