const express=require('express');
const router=express.Router();
const db=require('../models/index');
const {employee}=db;
const bcrypt=require('bcrypt');

router.post('/',async (request,response)=>{
    const {name,email,password,gdoId,projId,roleId} = request.body;
    const encryptedPassword=await bcrypt.hash(password,10);
    const signUpUser=await employee.findOne({
        where:{
            email:email
        },
        attributes:['email']
    })
    if(signUpUser){
        response.status(400).json({
            success:false,
            message:"This email already exist , change other one"
        })
    }
    else{
        const insertEmp=await employee.create({
            name:name,
            email:email,
            password:encryptedPassword,
            gdoId:gdoId,
            projId:projId,
            roleId:roleId
        })
        if(!insertEmp){
            response.status(400).json({
                success:false,
                message:"Employee not inserted"
            })
        }
        else{
            response.status(200).json({
                success:true,
                message:"Employee details inserted successfully"
            })
        }
    }
})

module.exports=router;