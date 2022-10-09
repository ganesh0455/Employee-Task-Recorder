import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AHeaders from "./Aheader";
import MHeaders from "./Mheader";
import '../styles.css'
import EHeaders from "./Eheaders";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ViewTasks() {
    const navigate = useNavigate();
    const loggedinUser = JSON.parse(localStorage.getItem('LoggedInUser'));
    const Role=loggedinUser.role.roleName;
    console.log("loggedinUser",loggedinUser)
    const jwt = JSON.parse(localStorage.getItem('jwtToken'));
    console.log("jwt=",jwt)
    const [tasks, setTasks] = useState([]);
    const [edit, setEdit] = useState(false);
    const [needToUpdate, setNeedToUpdate] = useState('');
    const [captureClickedTaskId, setCaptureClickedTaskId] = useState('');
    const [findrole,setRole]=useState('');
    const [name, setName] = useState({
        tasks: ''
    })
    
    useEffect(() => {
        //for jwt token
        console.log("you get into")
        if(jwt===null){
            navigate('/login');
            window.location.reload(true);
        }
    }, [jwt]);

    console.log(needToUpdate.needToUpdate);
    const capturedId = captureClickedTaskId.captureClickedTaskId;
    const textareaHandler = event => {
        setName({
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        const loggedinUser = JSON.parse(localStorage.getItem('LoggedInUser'));
        //console.log("role",loggedinUser.role.roleName);
        const getRole=loggedinUser.role.roleName;
        const gdoId=loggedinUser.gdoId;
        console.log("00000000000000000000",gdoId);
        setRole({
            findrole:loggedinUser.role.roleName
        })
        console.log("role",findrole);
        axios.get(`http://localhost:8001/viewtask?empId=${loggedinUser.id}&roleName=${getRole}`)
            .then(res => {
                var resdata = res.data;
                setTasks(resdata.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    async function handleSubmitAddTask(event) {
        event.preventDefault();
        console.log("loggedinUser.id", loggedinUser.id);
        axios.post(`http://localhost:8001/addtask?empId=${loggedinUser.id}`, {
            tasks: event.target.textArea.value
        })
        .then((res) => {
            if (res.data.success) {
                //toast.success(`${res.data.message}`,{position:toast.POSITION.BOTTOM_CENTER});
                window.location.reload(true);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    async function handleSubmitEditTask(event) {
        event.preventDefault();
        axios.put(`http://localhost:8001/updateTask?taskId=${capturedId}`, {
            tasks: event.target.textArea.value
        })
        .then((res) => {
            console.log(res);
            if (res.data.success) {
                setEdit({
                    edit: false
                })
                setName({
                    tasks: ''
                })
                window.location.reload(true);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div style={{backgroundColor:"#B9DCEC"}}>
            {Role==='employee' && <EHeaders />}
            {Role==='manager' && <MHeaders />}
            {Role==='admin' && <AHeaders />}
            <div className='m-5 card p-3  mx-auto sh' style={{ height: '500px', width: '850px', boxShadow: '0 0 2px 2px', marginLeft: '250px', marginTop: "10px", borderRadius: '10px', overflow: "scroll",backgroundColor:"#E4E4E4"}}>
                <ul>
                    <h3 style={{ textAlign: "center" }}>Your Daily Tasks</h3>
                    <table className="table table-hover">
                        <thead style={{fontSize:"18px",textAlign:"center"}}>
                            <tr>
                                <th>Task</th>
                                <th>Date</th>
                                {Role==='admin'?<></>:<th>Approval Waiting AT</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {tasks && tasks.map((task, i) => {
                                let stat;
                                const role=loggedinUser.role.roleName;
                                //console.log("roleeeeeeeeeeeeeeeeeeeeeeeee=",role);
                                if (role==="employee" && task.Mstatus === "Pending") {
                                    //console.log("Maaaaaaaaaaaaaaaaaaaaaa")
                                    stat = "Manager"
                                }
                                else if (task.Astatus === "Pending") {
                                    //console.log("****aaaaaaaaaaaaaaaaaaaaaa")
                                    stat = "Srinivas"
                                }
                                const handleDelete = event => {
                                    console.log("clicked id=", task.id)
                                    axios.delete(`http://localhost:8001/deleteTask?taskId=${task.id}`)
                                        .then((res) => {
                                            console.log("res.data.delete", res.data.success);
                                            if (res.data.success) {
                                                //alert("Task deleted successfully");
                                                window.location.reload(true)
                                            }
                                        })
                                        .catch(error => {
                                            console.log(error);
                                        })
                                }
                                const handleEdit = event => {
                                    setEdit({
                                        edit: true
                                    });
                                    var clickedTask = task.tasks;
                                    console.log("clickedTask", clickedTask);
                                    setNeedToUpdate({
                                        needToUpdate: clickedTask
                                    })
                                    console.log("needddddddd=",needToUpdate)
                                    console.log("clickedTaskid", task.id);
                                    setCaptureClickedTaskId({
                                        captureClickedTaskId: task.id
                                    })
                                }
                                const onChangeEdit = event => {
                                    [event.target.name] = event.target.value;
                                }
                                if(Role==='manager' || Role==='employee')
                                {
                                    return (
                                        <tr>
                                            <td>{task.tasks}</td>
                                            <td>{task.date}</td>
                                            <td>{stat}</td>
                                            <tr>
                                                <button className="btn btn-info" name="edit" onClick={handleEdit} onChange={onChangeEdit}>Edit</button>
                                                <button style={{ marginLeft: "5px" }} className="btn btn-danger" onClick={handleDelete}>Delete</button>
                                            </tr>
                                        </tr>
                                    );
                                }
                                else{
                                    return (
                                        <tr>
                                            <td>{task.tasks}</td>
                                            <td>{task.date}</td>
                                            <tr>
                                                <button className="btn btn-info" name="edit" onClick={handleEdit} onChange={onChangeEdit}>Edit</button>
                                                <button style={{ marginLeft: "5px" }} className="btn btn-danger" onClick={handleDelete}>Delete</button>
                                            </tr>
                                        </tr>
                                    );
                                }
                            })}
                        </tbody>
                    </table>
                </ul>
            </div>
            {edit ? <div>
                <form style={{ display: "flex", marginTop: "10px", marginLeft: "500px" }} onSubmit={handleSubmitEditTask}>
                    <textarea placeholder="Update your task"
                        rows="3"
                        cols="50"
                        name="textArea"
                        required="true"
                        type="text"
                        onChange={textareaHandler}
                    >
                        {needToUpdate.needToUpdate}
                    </textarea>
                    <button type="submit" className="btn btn-success" style={{ height: "35px", marginTop: "15px", marginLeft: "15px" }}>Update</button>
                </form>
            </div> : <form className="textArea" style={{ display: "flex", marginTop: "10px", marginLeft: "500px" }} onSubmit={handleSubmitAddTask}>
                <textarea placeholder="Enter your task"
                    rows="3"
                    cols="50"
                    name="textArea"
                    required="true"
                    type="text"
                    backgroundColor="green"
                    value={name.tasks}
                    onChange={textareaHandler}
                >
                </textarea>
                <button type="submit" className="btn btn-success" style={{ height: "35px", marginTop: "15px", marginLeft: "15px" }}>Add Task</button>
            </form>}
            <ToastContainer />
        </div>
    );
}

export default ViewTasks;