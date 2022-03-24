import React, {useState, useEffect} from 'react';
import {makeStyles, TextField} from "@material-ui/core";
import {useNavigate, useParams} from 'react-router-dom';
import Button from "@material-ui/core/Button";
import { userUpdate, getSingleUser} from "../redux/actions";
import axios from "axios";
import { connect } from "react-redux";

const useStyles = makeStyles({
    root: {
        marginTop: "100px",
    }
})
const EditUser = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    let { id } = useParams();
    const [state, setState] = useState({
        name: "",
        email: "",
        contact: "",
        address: ""
    })
    const {name, email, contact, address} = state;
    useEffect(()=>{
        axios.get(`http://localhost:5000/users/${id}`)
            .then((res) => {
                console.log(res.data);
                props.getSingleUser(res.data);
                setState({
                    name:res.data.name,
                    email:res.data.email,
                    contact:res.data.contact,
                    address:res.data.address,
                })
            })
            .catch((error)=>console.log(error))
    },[])
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        console.log(state)
    }
    const handleUpdate = (e) => {
        if(!name || !email || !contact || !address){
            setError("Please Enter Data in all field")
        }else{
            axios.put(`http://localhost:5000/users/${id}`, state)
                .then((res) => {
                    console.log(res.data);
                    props.userUpdate();
                })
                .catch((error) => console.log(error))
            navigate("/");
            setError("")
        }
    };

    return (
        <div align="center">
            <Button style={{marginTop: "40px"}} variant="contained" color="secondary" type="button"
                    onClick={() => navigate('/')}>Go Back</Button>
            <h1>Add User</h1>
            {error && <h3 style={{color:"red"}}>{error}</h3>}
            <form className={classes.root} noValidate autoComplete="off">
                <TextField style={{width: "50%", marginTop: "20px"}} name="name" id="standard-basic" label="Name"
                           value={name || ""}
                           type="text" onChange={handleChange}/><br/>
                <TextField style={{width: "50%", marginTop: "20px"}} name="email" id="standard-basic" label="Email"
                           value={email || ""}
                           type="email" onChange={handleChange}/><br/>
                <TextField style={{width: "50%", marginTop: "20px"}} name="contact" id="standard-basic" label="Contact"
                           value={contact || ""}
                           type="number" onChange={handleChange}/><br/>
                <TextField style={{width: "50%", marginTop: "20px"}} name="address" id="standard-basic" label="Address"
                           value={address || ""}
                           type="text" onChange={handleChange}/><br/>
                <Button style={{marginTop: "40px"}} variant="contained" color="primary" onClick={handleUpdate} type="button">Update</Button>
            </form>
        </div>
    )
}
const mapStateToProps = (state) => ({
    user:state.data.user
})
const mapDispatchToProps = (dispatch) => ({
    userUpdate : () => userUpdate(),
    getSingleUser: (dataa) => getSingleUser(dataa)
})
export default connect(mapStateToProps, mapDispatchToProps)(EditUser)