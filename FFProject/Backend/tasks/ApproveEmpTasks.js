const express=require('express');
const { where } = require('sequelize');
const app=express();
const router=express.Router();
const db=require('../models/index');
const {task,employee,role}=db;
app.use(express.json());

router.get('/',async (request,response)=>{
    const {empId}=request.query;
    let ApprovedTasks;
    console.log("%%%%%%%%%%")
    ApprovedTasks=await task.findAll({
        where:{
            eId:empId,
            Mstatus:"Approved",
            Astatus:"Approved"
        },
        attributes:['tasks','date']
    })
    console.log("ApprovedTasks[0]",ApprovedTasks[0]);
    const value=`${ApprovedTasks}`;
    console.log("value",value);
    if(!value){
        response.status(400).json({
            success:false,
            message:`Till no task has approved`
        })
    }
    else{
        response.status(200).json({
            status:true,
            data:ApprovedTasks
        })
    }
})

module.exports=router;