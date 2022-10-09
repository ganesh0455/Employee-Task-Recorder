const express=require('express');
const app=express();
const router=express.Router();
const db=require('../models/index');
const {employee,task,project,role}=db;
const {Op}=require('sequelize');
app.use(express.json())

task.belongsTo(employee,{foreignKey:"eId",targetKey:"id"});
router.get('/',async (request,response)=>{
    var {empId,roleName,gdoId}=request.query;
    let empJoinTask;
    roleName==='employee'?
    empJoinTask=await task.findAll({
        include:[{
            model:employee,
            required:true,
            attributes:['name']
        }],
        where:{
            eId:empId,
            [Op.or]:[
                {Mstatus:"Pending"},
                {Astatus:"Pending"}
            ],
        },
        order:[['id','asc']],
        attributes:['id','tasks','date',"Mstatus","Astatus"]
    }):
    empJoinTask=await task.findAll({
        include:{
            model:employee,
            required:true,
            attributes:['name']
        },
        where:{
            eId:empId,
            Astatus:"Pending"
        },
        order:[['id','asc']],
        attributes:['id','tasks','date',"Astatus"]
    })
    //console.log("empJoinTask",empJoinTask);
    if(empJoinTask){
        response.status(200).json({
            success:true,
            data:empJoinTask
        })
    }
    else{
        response.status(400).json({
            success:false,
            message:"Can't fetch the deatils"
        })
    }
    console.log(empJoinTask);
})

module.exports=router;