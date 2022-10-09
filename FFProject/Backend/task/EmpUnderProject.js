const express = require('express');
const { Op } = require('sequelize');
const app = express();
const router = express.Router();
const db = require('../models/index');
const { gdo, employee, project, role } = db;
app.use(express.json());

router.get('/',async (request,response)=>{
    const {projId}=request.query;
    const EmpsUnderProj=await employee.findAll({
        include:[
            {
                model:role,
                required:true,
                attributes:['roleName']
            },
            {
                model:project,
                required:true,
                attributes:['id','projName']
            }
        ],
        where:{
            [Op.or]:[
                {roleId:1},
                {roleId:2}
            ],
            projId:projId
        },
        attributes:['name']
    })
    response.send(EmpsUnderProj);
})

module.exports=router;