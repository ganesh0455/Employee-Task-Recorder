const express=require('express');
const app=express();
const cors=require('cors');
const signup=require("./login/signup");
const login=require("./login/login");
const addTask=require("./task/addTasks");
const viewTask=require("./task/viewTasks");
const deleteTask=require("./task/deleteTask");
const updateTasks=require("./task/updateTask");
const approvedEmpTasks=require("./task/approvedEmpTasks");
const rejectedEmpTasks=require("./task/rejectedEmpTasks");
const ManagerEms=require("./task/managerEmps");
const ApproveReject=require("./task/approveReject");
const empPendingTasksAtManagerOrAdmin=require("./task/empPendingTasksAtManagerOrAdmin");
const AllManagers=require('./task/AllManagers');
const managerPendingTasksAtAdmin=require('./task/managerPendingTasksAtAdmin');
const projectsUnderGdo=require('./task/projectsUnderGdo');
const EmpsUnderProject=require('./task/EmpUnderProject');
const distProj=require('./task/dist');
// const viewEmpTasks=require("./manager/viewEmptasks")
// const alltables=require("./tasks/alltables")
// const joinroleempproj=require("./tasks/EmpUnderProjUnderGdo")
// const joinTaskEmpRoleProjGdo=require("./tasks/tasksOfEmpUnderProjUnderGdo")
// const ApprovedEmpTasks=require("./tasks/ApproveEmpTasks");
// const ApprovedManagerTasks=require("./tasks/approvedManagerTasks");
app.use(express.json());
app.use(cors());

app.use('/signup',signup);
app.use('/login',login);
app.use('/addtask',addTask);
app.use('/viewtask',viewTask);
app.use('/deleteTask',deleteTask);
app.use('/updateTask',updateTasks);
app.use('/approvedEmpTasks',approvedEmpTasks);
app.use('/rejectedEmpTasks',rejectedEmpTasks);
app.use('/managerEmps',ManagerEms);
app.use('/ApproveORreject',ApproveReject);
app.use('/empPendingTasksAtManagerOrAdmin',empPendingTasksAtManagerOrAdmin);
app.use('/allManagers',AllManagers);
app.use('/managerPendingTasksAtAdmin',managerPendingTasksAtAdmin);
app.use('/projectsUnderGdo',projectsUnderGdo);
app.use('/empsUnderProject',EmpsUnderProject);
app.use('/distinctProj',distProj);
//app.use('/reject',rejectedTasks);
//app.use('/projectsUnderGdo',viewEmpTasks);
// app.use('/joinall',alltables);
// app.use('/joinroleempproj',joinroleempproj);
// app.use("/tasksOfEmpUnderProjUnderGdo",joinTaskEmpRoleProjGdo);
//app.use("/approve",ApproveReject);
//app.use('/approvedEmpTasks',ApprovedEmpTasks);
// app.use('/approvedManagerTasks',ApprovedManagerTasks);

app.listen(8001,()=>{
    console.log("Server started at http://localhost:8001/");
})