const express=require('express');
const app=express();
const router=express.Router();
const db=require('../models/index');
const {task,gdo,employee,project,role}=db;
app.use(express.json());

//project.belongsTo(gdo,{foreignKey:'projId',targetKey:'id'});
employee.belongsTo(gdo,{foreignKey:'gdoId',targetKey:'id'});
employee.belongsTo(project,{foreignKey:'projId',targetKey:'id'});
//task.belongsTo(employee,{foreignKey:"eId",targetKey:"id"});



router.get('/',async (request,response)=>{
    const {gdoId,empId}=request.query;
    const roleJoinEmpJoinProjJoinGdo=await task.findAll({
        include:
        [
            {
                model:employee,
                required:true,
                attributes:['name'],
                include:
                [
                    {
                        model:role,
                        required:true,
                        attributes:['roleName']
                    },
                    {
                        model:project,
                        required:true,
                        attributes:['projName'],
                        include:
                        [
                            {
                                model:gdo,
                                required:true,
                                attributes:['gdoName']
                            }
                        ],
                        where:{
                            gdoId:gdoId
                        }
                    }
                ]
            },
        ],
        where:
        {
            eId:empId
        },
        attributes:['tasks','date']
    })
    const isUserexist=`${roleJoinEmpJoinProjJoinGdo}`;
    if(isUserexist){
        response.status(200).json({
            success:true,
            data:roleJoinEmpJoinProjJoinGdo
        })
    }
    else{
        response.status(400).json({
            success:false,
            data:`No such user found with id ${empId} in GDO${gdoId}`
        })
    }
})

module.exports=router;