import React, {useState} from 'react'
import { connect } from 'react-redux'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { Typography } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import { getUsers, userDeleted } from '../redux/actions';
import { useNavigate } from 'react-router';
import axios from "axios";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        marginTop: 100,
        minWidth: 900
    }
})



const Home = (props) => {
    let navigate = useNavigate();
    const classes = useStyles();
    const [getuser,setGetUser] = useState(true);
    console.log(props);
    const getData = () => {
        axios.get("http://localhost:5000/users")
            .then((res) => {
                props.getUsers(res.data);
            })
            .catch((error)=>console.log(error))
        setGetUser(false);
    }
    if(getuser===true){
        getData()
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure wanted to delete user ?")) {
            axios.delete(`http://localhost:5000/users/${id}`)
                .then((res) => {
                    console.log(res.data);
                    props.userDeleted();
                    axios.get("http://localhost:5000/users")
                        .then((res) => {
                            props.getUsers(res.data);
                        })
                        .catch((error)=>console.log(error))
                })
                .catch((error)=>console.log(error))
        }
    }

    return (

        <div>
            <div align="center" style={{marginTop:50}}>
            <Typography variant="h2" component="div" gutterBottom>
                Crud With React-Redux
            </Typography>
            </div>
            <div align="center" style={{marginTop:70}}>
                <Button variant="contained" color="primary" onClick={()=>navigate('/AddUser')}>Add User</Button>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Contact</StyledTableCell>
                            <StyledTableCell align="center">Address</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.users && props.users.map((users) => (
                            <StyledTableRow key={users.id}>
                                <StyledTableCell align="center" component="th" scope="row">
                                    {users.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">{users.email}</StyledTableCell>
                                <StyledTableCell align="center">{users.contact}</StyledTableCell>
                                <StyledTableCell align="center">{users.address}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <ButtonGroup variant="contained" aria-label="contained primary button group">
                                        <Button style={{ marginRight: "5px" }} color="primary" onClick={() => navigate(`/EditUser/${users.id}`)}>Edit</Button>
                                        <Button color="secondary" onClick={() => handleDelete(users.id)}>Delete</Button>
                                    </ButtonGroup>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
const mapStateToProps = (state) => ({users:state.data.users})
const mapDispatchToProps = (dispatch) => ({
         userDeleted : () => dispatch(userDeleted()),
         getUsers : (userData) => dispatch(getUsers(userData))
})
export default connect(mapStateToProps,mapDispatchToProps)(Home);
