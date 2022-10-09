const { response, request } = require('express');
const express=require('express');
const app=express();
app.use(express.json());
const bcrypt=require('bcrypt');
const Employee=require('../models/employee')
const Gdo=require('../models/gdo');
const Role=require('../models/role');
const Task=require('../models/task');
const Project=require('../models/project');

// app.get('/asd',(request,response)=>{
//     response.json(Project.findAll());
// });

app.get('/signup',(request,response)=>{
    const {name,email,password,gdo,project,role}=request.body;
    
})



app.listen(8001,()=>{
    console.log("Server started at http://localhost:8001/");
});