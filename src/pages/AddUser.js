import React, {useState} from 'react'
import {makeStyles, TextField} from "@material-ui/core"
import {useNavigate} from 'react-router-dom'
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import { userAdded} from "../redux/actions";
import axios from "axios";

const useStyles = makeStyles({
    root: {
        marginTop: "100px",
    }
})
const AddUser = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [error, setError] = useState()
    const [state, setState] = useState({
        name: "",
        email: "",
        contact: "",
        address: ""
    })
    const {name, email, contact, address} = state;
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        console.log(state)
    }
    const handleSubmit = (e) => {
        if(!name || !email || !contact || !address){
            setError("Please Enter Data in all field")
        }else{
            axios.post(`http://localhost:5000/users`,state)
                .then((res) => {
                    console.log(res.data);
                    props.userAdded();
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
                           value={name}
                           type="text" onChange={handleChange}/><br/>
                <TextField style={{width: "50%", marginTop: "20px"}} name="email" id="standard-basic" label="Email"
                           value={email}
                           type="email" onChange={handleChange}/><br/>
                <TextField style={{width: "50%", marginTop: "20px"}} name="contact" id="standard-basic" label="Contact"
                           value={contact}
                           type="number" onChange={handleChange}/><br/>
                <TextField style={{width: "50%", marginTop: "20px"}} name="address" id="standard-basic" label="Address"
                           value={address}
                           type="text" onChange={handleChange}/><br/>
                <Button style={{marginTop: "40px"}} variant="contained" color="primary" onClick={handleSubmit} type="button">Submit</Button>
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    userAdded : ()=> userAdded()
})
export default connect(null,mapDispatchToProps)(AddUser)