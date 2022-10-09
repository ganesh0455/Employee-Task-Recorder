const express=require('express');
const { where } = require('sequelize');
const app=express();
const router=express.Router();
const db=require('../models/index');
const {task,employee,role}=db;
app.use(express.json());


router.get('/',async (request,response)=>{
    const {ManagerId,roleId,status}=request.query;
    const Approved=await task.findAll({
        include:[{
            model:employee,
            required:true,
            attributes:['name'],
            include:[{
                model:role,
                required:true,
                attributes:['roleName']
            }],
            where:{
                roleId:roleId
            }
        }],
        where:{
            eId:ManagerId,
            Astatus:`${status}`
        },
        attributes:['tasks','date','Astatus']
    })
    const valueApproved=`${Approved}`;
    if(valueApproved){
        response.status(200).json({
            success:true,
            data:Approved
        })
    }
    else{
        response.status(400).json({
            success:false,
            message:`Give correct ManagerId or RoleId or No ${status} Tasks of this this Employee`
        })
    }
})

module.exports=router;