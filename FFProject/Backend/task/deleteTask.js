const express=require('express');
const app=express();
const router=express.Router();
const db=require('../models/index');
const {task}=db;
app.use(express.json());

router.delete('/',async (request,response)=>{
    const {taskId}=request.query;
    const deletedTask=await task.destroy({
        where:{
            id:taskId
        }
    })
    // console.log("deleted =",deletedTask);
    // console.log("ganesh")
    if(deletedTask!=0){
        response.status(200).json({
            success:true,
            message:"Task deleted successfully"
        })
    }
    else{
        response.status(400).json({
            success:false,
            message:`Task id ${taskId} is not exist`
        })
    }
})

module.exports=router;