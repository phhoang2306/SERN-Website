import actionTypes from './actionTypes';
import {handleCreateUSer} from "../../services/userServiceAPI"
export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})

export const userLoginFail = () =>({
    type: actionTypes.USER_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})

export const CreatUser = (data) =>{
    return async (dispatch, getState) =>{
        try{
            let res = await handleCreateUSer(data);
            if (res && res.errCode === 0) {
                dispatch(createUserSuccessfull(res));
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