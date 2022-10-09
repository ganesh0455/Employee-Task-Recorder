const { response, request } = require('express');
const express=require('express');
const app=express();
app.use(express.json());
const bcrypt=require('bcrypt');
const db=require('../models/index');
const {Op}=require('sequelize');
const jwtToken=require('jsonwebtoken');
const cors=require('cors');
app.use(cors());
const Employee=require('../models/employee')
const Gdo=require('../models/gdo');
const Role=require('../models/role');
const Task=require('../models/task');
const Project=require('../models/project');
const {employee,gdo,project,role,task}=db;
app.get('/',(request,response)=>{
    let Token;
    const authHeader=request.headers["authorization"];
    //console.log("authHeader",authHeader);
    if(authHeader !== undefined){
        Token=authHeader.split(" ")[1];
    }
    if(Token === undefined){
        response.status(401).json({
            success:false,
            message:"You are unauthorized, invalid JWT Token"
        })
    }
    else{
        
        jwtToken.verify(Token,"my_secret_token_chethu",async (error,payload)=>{
            if(error){
                //console.log("*************error*************")
                response.sendStatus(401).json({
                    success:false,
                    message:"Secrete key ot JWT token invalid"
                })
            }
            else{
                //console.log("^^^^^Payload*****",payload);
                //console.log("hi chethu , you are authorized")
                response.json(task.findAll());
            }
        })
    }
    //console.log("Backend running fine");
})

// Inserting into role table

app.post('/role',async (request,response)=>{
    const {roleName}=request.body;
    const createRole=await role.create({
        roleName:roleName
    })
    console.log("+++++++++++++",createRole);
    if(!createRole){
        response.status(400).json({
            success:false,
            message:"role not inserted"
        })
    }
    else{
        response.status(200).json({
            success:true,
            message:"Role inserted successfully"
        })
    }
})

// Inserting into gdo table

app.post('/gdo',async (request,response)=>{
    const {gdoName}=request.body;
    const createGdo=await gdo.create({
        gdoName:gdoName
    })
    console.log("+++++++++++++",createGdo);
    if(!createGdo){
        response.status(400).json({
            success:false,
            message:"Gdo not inserted"
        })
    }
    else{
        response.status(200).json({
            success:true,
            message:"Gdo inserted successfully"
        })
    }
})

// Inserting into project table

app.post('/project',async (request,response)=>{
    // const {gdoId}=request.params;
    // console.log(gdoId);
    const {projName,gdoId}=request.body;
    console.log("******",projName);
    const createProj=await project.create({
        projName:projName,
        gdoId:gdoId
    })
    if(!createProj){
        response.status(400).json({
            success:false,
            message:"Project not inserted"
        })
    }
    else{
        response.status(200).json({
            success:true,
            message:"Project inserted successfully"
        })
    }

})

// Inserting into employee table

app.post('/oneuser',async (request,response)=>{
    const {email}=request.body;
    console.log("**email***",email)
    const user=await employee.findAll({
        where:{
            email:email
        }
    })
    console.log("*******user****",`${user}`);
    const userValue=`${user}`;
    console.log("Userrrrrrrrrrrrrrrr======",user)
    if(userValue){
        response.json({
            success:true,
            message:"User already exist"
        })
    }
    else{
        response.status(400).json({
            success:false,
            message:"User not found you can insert"
        })
    }
})

// insert employee details

app.post('/employee',async (request,response)=>{
    console.log("******************************************************************")
    const {name,email,password,gdoId,projId,roleId} = request.body;
    const encryptedPassword=await bcrypt.hash(password,10);
    const insertEmp=await employee.create({
        name:name,
        email:email,
        password:encryptedPassword,
        gdoId:gdoId,
        projId:projId,
        roleId:roleId
    })
    if(!insertEmp){
        response.status(400).json({
            success:false,
            message:"Employee not inserted"
        })
    }
    else{
        response.status(200).json({
            success:true,
            message:"Employee details inserted successfully"
        })
    }
})

// inserting tasks

app.post('/task',async (request,response)=>{
    const {eId,tasks,date} = request.body;
    const createTask=await task.create({
        eId:eId,
        tasks:tasks,
        date:date,
        Mstatus:'Pending',
        Astatus:'Pending'
    })
    if(!createTask){
        response.status(400).json({
            success:false,
            message:"Task hasn't inserted"
        })
    }
    else{
        response.status(200).json({
            success:true,
            message:"Task has inserted successfully"
        })
    }
})

// signup eith new user details

app.post('/signUp',async (request,response)=>{
    const {name,email,password,gdoId,projId,roleId} = request.body;
    const encryptedPassword=await bcrypt.hash(password,10);
    const signUpUser=await employee.findOne({
        where:{
            email:email
        },
        attributes:['email']
    })
    const signUpUserValue=`${signUpUser}`;
    if(signUpUserValue){
        response.status(400).json({
            success:false,
            message:"With this email user already exist"
        })
    }
    else{
        const insertEmp=await employee.create({
            name:name,
            email:email,
            password:encryptedPassword,
            gdoId:gdoId,
            projId:projId,
            roleId:roleId
        })
        if(!insertEmp){
            response.status(400).json({
                success:false,
                message:"Employee not inserted"
            })
        }
        else{
            response.status(200).json({
                success:true,
                message:"Employee details inserted successfully"
            })
        }
    }
})

employee.belongsTo(role,{foreignKey:"roleId",targetKey:"id"});
employee.belongsTo(gdo,{foreignKey:"gdoId",targetKey:"id"});
employee.belongsTo(project,{foreignKey:"projId",targetKey:"id"});

app.post('/login',async (request,response)=>{
    
    const {email,password}=request.body
    console.log("form password= ",password)
    const loginUser=await employee.findOne({
        include:[{
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
        attributes:['email','name','password','gdoId']
    })
    if(loginUser){
        const isPasswordMatched=await bcrypt.compare(password,loginUser.password)
        if(isPasswordMatched){
            const payload={email:email};
            const maxAgeofToken=(60*60)*1000;
            const jwt=jwtToken.sign(payload,"my_secret_token_chethu",{
                expiresIn:maxAgeofToken
            })
            response.status(200).json({
                success:true,
                data:loginUser,
                message:"Login successfull",
                jwt_token:jwt
            })
        }
        else{
            response.status(400).json({
                success:false,
                message:"Invalid Password"
            })
        }
    }
    else{
        response.status(400).json({
            success:false,
            message:"Invalid Email"
        })
    }
})
//*************************************************** */

//update task base on task id

app.put('/updateTask/:taskId',async (request,response)=>{
    const {taskId}=request.params;
    console.log("taskId=",taskId)
    const {tasks}=request.body
    console.log("tasks=",tasks)
    const taskUpdate=await task.update({tasks:tasks},{
        where:{
            id:taskId
        }
    })
    console.log("taskUpdate=",taskUpdate);
    console.log("taskUpdate=",`${taskUpdate}`);
    const taskUpdateStatus=`${taskUpdate}`;
    if(taskUpdateStatus==1){
        response.status(200).json({
            success:true,
            message:`Taks is updated successfully at ${taskId}`
        })
    }
    else{
        response.status(400).json({
            success:false,
            message:`Taks is not updated`
        })
    }

})


//************************************************
//role.hasMany(employee,{targetKey:"id",foreignKey:"roleId"});
role.hasMany(employee);
employee.belongsTo(role);

app.get('/roleJoinEmp',async (request,response)=>{
    const {roleId}=request.query;
    const newId=parseInt(roleId);
    //console.log("params***********newId",roleId);
    const roleJoinemp=await role.findAll({
        include : {
            model:employee,
            required:true,
            attributes:['name','email']
        },
        where:{id:roleId},
        attributes:['roleName']
    })
    //console.log("tasks=",tasks.data);
    const value=`${roleJoinemp}`;
    console.log("valeu=",value);
    //response.status(200).send(roleJoinemp);
    //console.log("hello",roleJoinemp)
    const roleValue=`${roleJoinemp}`;
    console.log("roleValue",roleValue);
    if(roleValue){
        response.status(200).json({
            success:true,
            data:roleJoinemp
        })
    }
    else{
        response.status(400).json({
            success:false,
            message:`Role id ${roleId} not matched`
        })
    }

})

//display GDO projects

gdo.hasMany(project);
project.belongsTo(gdo);

app.get('/projectsUnderGdo',async (request,response)=>{
    const {gdoId}=request.query;
    const gdoJoinProject=await gdo.findAll({
        include : {
            model:project,
            required:true,
            attributes:['id','projName']
        },
        where:{id:gdoId},
        attributes:['id']
    })
    const gdoValue=`${gdoJoinProject}`;
    console.log("value=",gdoValue);
    //response.send(gdoJoinProject);
    if(gdoValue){
        response.status(200).json({
            success:true,
            data:gdoJoinProject
        })
    }
    else{
        response.status(400).json({
            success:false,
            message:`Gdo id ${gdoId} is not found`
        })
    }
})

/// one particular employee tasks

// employee.hasMany(task);
employee.belongsTo(task,{targetKey:'eId',foreignKey:'id'});

app.get('/empTask',async (request,response)=>{
    const {empId}=request.query;
    const empJoinTask=await employee.findAll({
        include:{
            model:task,
            required:true,
            attributes:['tasks','date']
        },
        where:{
            id:empId
        },
        attributes:['name']
    });
    response.send(empJoinTask);
})

app.put('/Approve',async (request,response)=>{
    const {taskId}=request.query;
    console.log("taskId=",taskId)
    const taskUpdate=await task.update({Mstatus:"Approved"},{
        where:{
            id:taskId,
            Mstatus:'Pending'
        }
    })
    console.log("taskUpdate=",taskUpdate);
    console.log("taskUpdate=",`${taskUpdate}`);
    const taskUpdateStatus=`${taskUpdate}`;
    if(taskUpdateStatus==1){
        response.status(200).json({
            success:true,
            message:`Taks is updated successfully at ${taskId}`
        })
    }
    else{
        response.status(400).json({
            success:false,
            message:`Taks is not updated`
        })
    }

})


//****************************** */
app.listen(8001,()=>{
    console.log("Server started at http://localhost:8001/");
})

