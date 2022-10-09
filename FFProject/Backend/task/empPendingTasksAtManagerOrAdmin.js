const express=require('express');
const app=express();
const router=express.Router();
const db=require('../models/index');
const {task}=db;
app.use(express.json());

router.get('/',async (request,response)=>{
    const {empId,role}=request.query;
    let listOfTasks;
    role==='manager'?
    listOfTasks=await task.findAll({
        where:{
            eId:empId,
            Mstatus:'Pending'
        },
        attributes:['id','tasks','date','Mstatus']
    }):
    listOfTasks=await task.findAll({
        where:{
            eId:empId,
            Mstatus:'Approved',
            Astatus:'Pending'
        },
        attributes:['id','tasks','date','Astatus']
    })
    //response.send(listOfTasks);
    const value=`${listOfTasks}`;
    if(listOfTasks){
        response.status(200).json({
            success:true,
            data:listOfTasks
        })
    }
    else{
        response.status(400).json({
            success:false,
            message:"Inputs wrong or No data data found"
        })
    }
})

module.exports=router;