import actionTypes from './actionTypes';
import {handleCreateUSer, handleDeleteUser, handleEditUser} from "../../services/userServiceAPI"
import {fetchGetAllUser} from './adminActions'
// Add User
export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

// Login
export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})
export const userLoginFail = () =>({
    type: actionTypes.USER_LOGIN_FAIL
})

// Logout
export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})

// Create user
export const CreatUser = (data) =>{
    return async (dispatch, getState) =>{
        try{
            let res = await handleCreateUSer(data);
            if (res && res.errCode === 0) {
                dispatch(createUserSuccessfull(res));
                dispatch(fetchGetAllUser());
            } else{
                dispatch(createUserFailed(res));
            }
        }catch(e){
            dispatch(createUserFailed(e));
            console.log("Error save user ", e)
        }
    }
}
export const createUserSuccessfull = (res) => ({
    type: actionTypes.CREATE_USER_SUCCESSFUL,
    res: res
})
export const createUserFailed = (res) => ({
    type: actionTypes.CREATE_USER_FAILED,
    res: res
})

///Delete User
export const deleteUser = (id) =>{
    return async (dispatch, getState) =>{
        try{
            let res = await handleDeleteUser(id)
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccessful(res));
                dispatch(fetchGetAllUser());
            } else{
                dispatch(deleteUserFailed(res));
            }
        }catch(e){
            dispatch(deleteUserFailed(e));
            console.log("Error save user ", e)
        }
    }
}
export const deleteUserSuccessful = (res) => ({
    type: actionTypes.DELETE_USER_SUCCESSFUL,
    res: res
})
export const deleteUserFailed = (res) => ({
    type: actionTypes.DELETE_USER_FAILED,
    res: res
})

// Edit User
export const editUser = (user) =>{
    return async (dispatch, getState) =>{
        try{
            let res = await handleEditUser(user)
            if (res && res.errCode === 0) {
                dispatch(editUserSuccessful(res))
                dispatch(fetchGetAllUser());
            } else{
                dispatch(editUserFailed(res));
            }
        }catch(e){
            dispatch(editUserFailed(e));
            console.log("Error save user ", e)
        }
    }
}
export const editUserSuccessful = (res) => ({
    type: actionTypes.EDIT_USER_SUCCESSFUL,
    res: res
})
export const editUserFailed = (res) => ({
    type: actionTypes.EDIT_USER_FAILED,
    res: res
})