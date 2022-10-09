const express=require('express');
const app=express();
const router=express.Router();
const db=require('../models/index');
const {Op}=require('sequelize');
const {task}=db;
app.use(express.json());

router.get('/',async (request,response)=>{
    const {empId,role}=request.query;
    let ApprovedTasks;
    role==='employee'?
    ApprovedTasks=await task.findAll({
        where:{
            eId:empId,
            [Op.or]:[
                {Mstatus:"Rejected"},
                {Astatus:"Rejected"}
            ],
        },
        attributes:['id','tasks','date','Mstatus','Astatus']
    }):
    ApprovedTasks=await task.findAll({
        where:{
            eId:empId,
            Astatus:"Rejected"
        },
        attributes:['id','tasks','date','Astatus']
    })
    console.log("RejectedTasks[0]",ApprovedTasks[0]);
    const value=`${ApprovedTasks}`;
    console.log("value",value);
    if(!value){
        response.status(400).json({
            success:false,
            message:`Till no task has rejected`
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