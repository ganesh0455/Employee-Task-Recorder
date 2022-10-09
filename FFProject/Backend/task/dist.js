const express = require('express');
const app = express();
const router = express.Router();
const db = require('../models/index');
const {Op, where}=require('sequelize');
const { gdo, employee, project, role } = db;
app.use(express.json());

router.get('/',async (request,response)=>{
    const allProjUnderGdo=await project.findAll({
        include:[{
            model:gdo,
            required:true,
            attributes:['gdoName']
        }],
        where:{
            gdoId:gdoId
        }
    })
    response.send(allProjUnderGdo);
})

module.exports=router;