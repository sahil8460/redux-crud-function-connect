import axios from 'axios'
import * as types from './actionType'

export const getUsers = (users) =>({
    type: types.GET_USERS,
    payload: users,
})

export const userDeleted = () => ({
    type: types.DELETE_USER
})

export const userAdded = () => ({
    type: types.ADD_USER
})

export const userUpdate = () => ({
    type: types.UPDATE_USER
})

export const getUser = (user) => ({
    type: types.GET_SINGLE_USER,
    payload: user
})

// export const loadUsers = () => {
//     return function (dispatch){
//         axios.get("http://localhost:5000/users")
//         .then((res) => {
//             dispatch(getUsers(res.data))
//         })
//         .catch((error)=>console.log(error))
//     };
// };

// export const deleteUser = (id) => {
//
//     return function (dispatch){
//         axios.delete(`http://localhost:5000/users/${id}`)
//         .then((res) => {
//             console.log(res.data);
//             dispatch(userDeleted());
//             dispatch(loadUsers());
//         })
//         .catch((error)=>console.log(error))
//     };
// };

export const getSingleUser = (id) => {

    return function (dispatch){
        axios.get(`http://localhost:5000/users/${id}`)
            .then((res) => {
                console.log(res.data);
                dispatch(getUsers(res.data))
            })
            .catch((error)=>console.log(error))
    };
};

export const addUser = (id) => {

    return function (dispatch) {
        axios.post(`http://localhost:5000/users`,id)
            .then((res) => {
                console.log(res.data);
                dispatch(userAdded());
            })
            .catch((error) => console.log(error))
    };
};

export const userUpdated = (user, id) => {

    return function (dispatch) {
        axios.put(`http://localhost:5000/users/${id}`, user)
            .then((res) => {
                console.log(res.data);
                dispatch(userUpdate());
            })
            .catch((error) => console.log(error))
    };
};