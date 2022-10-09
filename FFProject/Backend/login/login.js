const express=require('express');
const router=express.Router();
const db=require('../models/index');
const {employee,gdo,role,project}=db;
const bcrypt=require('bcrypt');
const jwtToken=require('jsonwebtoken');

employee.belongsTo(role,{foreignKey:"roleId",targetKey:"id"});
employee.belongsTo(gdo,{foreignKey:"gdoId",targetKey:"id"});
employee.belongsTo(project,{foreignKey:"projId",targetKey:"id"});

router.post('/',async (request,response)=>{
    
    const {email,password}=request.body;
    const loginUser=await employee.findOne({
        include:[
        {
            model:role,
            required:true,
            attributes:['roleName']
        },
        {
            model:gdo,
            required:true,
            attributes:['gdoName']
        },
        {
            model:project,
            required:true,
            attributes:['projName']
        }],
        where:{
            email:email
        },
        attributes:['id','email','name','password','gdoId']
    })
    if(loginUser){
        const isPasswordMatched=await bcrypt.compare(password,loginUser.password)
        if(isPasswordMatched){
            const payload={email:email};
            const maxAgeofToken=(60*60)*1000;
            const jwt=jwtToken.sign(payload,"my_secret_token_chethu",{
                expiresIn:maxAgeofToken
            });
            response.status(200).json({
                success:true,
                data:loginUser,
                message:"Login successfull",
                jwt_token:jwt
            });
        }
        else{
            response.status(400).json({
                success:false,
                message:"Invalid Password"
            });
        }
    }
    else{
        response.status(400).json({
            success:false,
            message:"Invalid Email"
        })
    }
})

module.exports=router;