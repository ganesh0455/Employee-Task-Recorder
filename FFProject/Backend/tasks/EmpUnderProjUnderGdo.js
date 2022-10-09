const express = require('express');
const app = express();
const router = express.Router();
const db = require('../models/index');
const { task, gdo, employee, project, role } = db;
app.use(express.json());

//project.belongsTo(gdo,{foreignKey:'projId',targetKey:'id'});
employee.belongsTo(gdo, { foreignKey: 'gdoId', targetKey: 'id' });
employee.belongsTo(project, { foreignKey: 'projId', targetKey: 'id' });
//task.belongsTo(employee,{foreignKey:"eId",targetKey:"id"});



router.get('/', async (request, response) => {
    const { gdoId } = request.query;
    const roleJoinEmpJoinProjJoinGdo = await employee.findAll({
        include: [{
            model: role,
            required: true,
            attributes: ['roleName']
        },
        {
            model: project,
            required: true,
            attributes: ['projName'],
            include: [{
                model: gdo,
                required: true,
                attributes: ['gdoName']
            }],
            where: {
                gdoId: gdoId
            }
        }
        ],
        where: {
            roleId: 1
        },
        attributes: ['name', 'email']
    })
    if (roleJoinEmpJoinProjJoinGdo) {
        response.status(200).json({
            success: true,
            data: roleJoinEmpJoinProjJoinGdo
        })
    }
})

module.exports = router;