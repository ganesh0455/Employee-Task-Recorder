const express=require('express');
const app=express();
const router=express.Router();
const db=require('../models/index');
const {task}=db;
app.use(express.json());

router.get('/',async (request,response)=>{
    const {managerId,role}=request.query;
    const listOfTasks=await task.findAll({
        where:{
            eId:managerId,
            Astatus:'Pending'
        },
        attributes:['id','tasks','date','Astatus']
    })
    //response.send(listOfTasks);
    if(listOfTasks){
        response.status(200).json({
            success:true,
            data:listOfTasks
        })
    }
    else{
        response.status(400).json({
            success:false,
            message:"In correct details or no tasks for given filters"
        })
    }
})

module.exports=router;