const express = require('express');
const app = express();
const router = express.Router();
const db = require('../models/index');
const {Op}=require('sequelize');
const { gdo, employee, project, role } = db;
app.use(express.json());
const sequelize=require('sequelize');

project.belongsTo(gdo,{foreignKey:'gdoId',targetKey:'id'});
//employee.belongsTo(gdo, { foreignKey: 'gdoId', targetKey: 'id' });
//employee.belongsTo(project, { foreignKey: 'projId', targetKey: 'id' });
//task.belongsTo(employee,{foreignKey:"eId",targetKey:"id"});

//gdo.hasMany(project,{foreignKey:'gdoId',targetId:'id'});

router.get('/', async (request, response) => {
    const { gdoId } = request.query;
    const roleJoinEmpJoinProjJoinGdo = await project.findAll({
        include:[{
            model:gdo,
            required:true,
            attributes:['gdoName']
        }],
        where:{
            gdoId:gdoId
        },
        attributes:['id','projName']
    })
    if (roleJoinEmpJoinProjJoinGdo) {
        response.status(200).json({
            success: true,
            data: roleJoinEmpJoinProjJoinGdo
        })
    }
})

module.exports = router;