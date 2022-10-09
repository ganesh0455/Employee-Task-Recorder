const express=require('express');
const app=express();
const router=express.Router();
const db=require('../models/index');
const {task,gdo,employee,project,role}=db;
app.use(express.json());

//project.belongsTo(gdo,{foreignKey:'projId',targetKey:'id'});
employee.belongsTo(gdo,{foreignKey:'gdoId',targetKey:'id'});
employee.belongsTo(project,{foreignKey:'projId',targetKey:'id'});
task.belongsTo(employee,{foreignKey:"eId",targetKey:"id"});


router.get('/',async (request,response)=>{
    const {projId}=request.query;
    const gdoJoinProject=await employee.findAll({
        include : [{
            model:project,
            required:true,
            include:[{
                model:gdo,
                required:true,
                attributes:['gdoName']
            }],
            attributes:['projName']
        },
        {
            model:role,
            required:true,
            attributes:['roleName']
        },
    ],
    attributes:['name']
    })
    if(gdoJoinProject){
        response.status(200).json({
            success:true,
            data:gdoJoinProject
        })
    }
})

module.exports=router;