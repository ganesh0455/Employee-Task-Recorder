import axios from "axios";
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ManagerEmps(){
    const navigate = useNavigate();
    const loggedinUser = JSON.parse(localStorage.getItem('LoggedInUser'));
    const jwt = JSON.parse(localStorage.getItem('jwtToken'));
    console.log("jwt=",jwt)
    const [ManagerEmps,setManagerEmps]=useState([]);
    const [managerEmpTask,setManagerEmpTask]=useState([]);
    const [capturedId,setCapturedId]=useState('');
    const [stateEmpName,setStateEmpName]=useState('');
    const [empId,setEmpId]=useState('');
    const [getRole,setGetRole]=useState('');
    useEffect(() => {
        //for jwt token
        console.log("you get into")
        if(jwt===null){
            navigate('/login')
            window.location.reload(true);
        }
    }, [jwt]);

    const gdoId=loggedinUser.gdoId;
    console.log("gdoId=",gdoId);
    useEffect(()=>{
        axios.get(`http://localhost:8001/managerEmps?gdoId=${gdoId}`)
        .then((res)=>{
            console.log(res.data.data);
            setManagerEmps(res.data.data);
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])
    
    async function handleEmpOutside(clickedId,role)
    {
        axios.get(`http://localhost:8001/empPendingTasksAtManagerOrAdmin?empId=${clickedId}&role=${role}`)
            .then(res => {
            var resdata = res.data;
            console.log("resdata++++", resdata.data);
            console.log("length=",resdata.data.length)
                setManagerEmpTask(resdata.data);
            })
            .catch(err => {
            console.log(err);
        })
    }
    return(
        <div style={{backgroundColor:"#B9DCEC",minHeight:"100vh"}}>
            <div>
                <nav className="navbar navbar-inverse" style={{height:"53px"}}>
                    <div className="container-fluid">
                        <ul className="nav navbar-nav">
                        <li><a style={{color:"#B9DCEC",cursor:"pointer"}} onClick={()=>{navigate('/viewTasks')}}>Home</a></li>
                        <li><a style={{pointerEvents:"none",marginLeft:"770px",color:"white"}}>{loggedinUser?.name}</a></li>
                        <li><a style={{pointerEvents:"none",color:"white"}}>{loggedinUser.gdo.gdoName}</a></li>
                        <li><a style={{pointerEvents:"none",color:"white"}}>{loggedinUser.project.projName}</a></li>
                        <li><a style={{cursor:"pointer",color:"red"}} onClick={() => { localStorage.clear(); navigate('/login')}}>Logout</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div style={{backgroundColor:"#B9DCEC",display:'flex'}}>
                <div style={{ height: '300px', width: '400px', boxShadow: '0 0 2px 2px', marginLeft: '120px', marginTop: "170px", borderRadius: '10px',backgroundColor:"#E4E4E4"}}>
                   <table className="table table-hover">
                        <thead style={{fontSize:"18px"}}>
                            <tr>
                                <th>Employee</th>
                                <th>Project Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ManagerEmps && ManagerEmps.map((emp,i)=>{
                                const getRole=loggedinUser.role.roleName;
                                console.log("getRole",getRole);
                                const handleEmp=event=>{
                                    setStateEmpName(emp.name);
                                    setEmpId(emp.id);
                                    setGetRole(getRole);
                                    handleEmpOutside(emp.id,getRole);
                                }
                                return(
                                    <tr>
                                        <td onClick={handleEmp} style={{cursor:"pointer"}}>{emp.name}</td>
                                        <td>{emp.project.projName}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                   </table>
                </div>
                <div style={{ height: '570px', width: '700px', boxShadow: '0 0 2px 2px', marginLeft: '70px', borderRadius: '10px',backgroundColor:"#E4E4E4",overflow: "scroll"}}>
                    <h2 style={{textAlign:"center"}}>{stateEmpName}</h2>
                    <div style={{marginLeft:"90px"}}><table className="table table-hover">
                        <thead style={{fontSize:"18px"}}>
                            <tr>
                                <th>Task</th>
                                <th>Date</th>
                            <tr>
                                <th></th>
                            </tr>
                            </tr>
                        </thead>
                        <tbody>
                            {managerEmpTask && managerEmpTask.map((task,i)=>{
                                const handleApproveReject=event=>{
                                    console.log("ClickedId=",task.id);
                                    console.log("loogedin=",loggedinUser.role.roleName);
                                    console.log("event=",event.target.value);
                                    //const status='Approved';
                                    let status;
                                    if(event.target.value==='1'){
                                        status='Approved';
                                        //console.log("approve");
                                    }
                                    else if(event.target.value==='2'){
                                        status='Rejected';
                                        //console.log("reject");
                                    }
                                    const clickedId=task.id;
                                    const roleName=loggedinUser.role.roleName;
                                    axios.put(`http://localhost:8001/ApproveORreject?taskId=${clickedId}&roleName=${roleName}&status=${status}`)
                                    .then((res)=>{
                                        console.log("ApprovedRes=",res);
                                        handleEmpOutside(empId,getRole);
                                    })
                                    .catch((error)=>{
                                        console.log(error);
                                    })
                                }
                                return(
                                    <tr>
                                        <td>{task.tasks}</td>
                                        <td>{task.date}</td>
                                        <tr>
                                            <button value="1" className="btn btn-success" onClick={handleApproveReject}>Approve</button>
                                            <button value="2" className="btn btn-danger" style={{marginLeft:"15px"}} onClick={handleApproveReject}>Reject</button>
                                        </tr>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table></div>
                </div>
            </div>
        </div>
    );
}

export default ManagerEmps;