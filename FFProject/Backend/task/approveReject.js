const express=require('express');
const app=express();
const router=express.Router();
const db=require('../models/index');
const {task}=db;
app.use(express.json());

router.put('/',async (request,response)=>{
    const {taskId,roleName,status}=request.query;
    let approvedBy;
    console.log("roleName=",roleName);
    //let finalStat=status;
    console.log("Stat=",status);
    roleName==='manager'?
    approveTask=await task.update({Mstatus:status},{
        where:{
            id:taskId
        }
    }):
    approveTask=await task.update({Astatus:status},{
        where:{
            id:taskId
        }
    })
    //console.log(approveTask)
    if(approveTask[0]===1){
        console.log("success")
        response.status(200).json({
            success:true,
            message:`Task ${status} by your ${roleName}`
        })
    }
    else{
        response.status(400).json({
            success:false,
            message:"Task id is not exist"
        })
    }
})

module.exports=router;