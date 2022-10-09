const express=require('express');
const app=express();
const router=express.Router();
const db=require('../models/index');
const {employee,role,gdo,project}=db;
app.use(express.json());

employee.belongsTo(role,{foreignKey:"roleId",targetKey:"id"});
employee.belongsTo(gdo,{foreignKey:"gdoId",targetKey:"id"});
router.get('/',async (request,response)=>{
    const {gdoId}=request.query;
    const selfJoinEmp=await employee.findAll({
        include:[{
            model:role,
            required:true,
            attributes:['roleName']
        },
        {
            model:project,
            required:true,
            attributes:['projName']
        }
    ],
        where:{
            roleId:1,
            gdoId:gdoId
        },
        attributes:['id','name']
    })
    //response.send(selfJoinEmp);
    if(`${selfJoinEmp}`){
        response.status(200).json({
            success:true,
            data:selfJoinEmp
        })
    }
    else{
        response.status(400).json({
            success:false
        })
    }
})

module.exports=router;