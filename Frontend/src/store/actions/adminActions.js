import actionTypes from './actionTypes';
import {handlegetAllCodes} from "../../services/userServiceAPI"
import {getAllUSers} from "../../services/userServiceAPI"

// Get Gender
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try{
            dispatch({type: actionTypes.FETCH_START})
            let res = await handlegetAllCodes('gender');
            if(res && res.errCode === 0){
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFail());
            }
        } catch(e){
            dispatch(fetchGenderFail());
            console.log("fecthGenderStart error", e);
        }

    }
}
export const fetchGenderSuccess = (data) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: data
})
export const fetchGenderFail = () =>({
    type: actionTypes.FETCH_GENDER_FAIL
})

// Get Role
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try{
            dispatch({type: actionTypes.FETCH_START})
            let res = await handlegetAllCodes('role');
            if(res && res.errCode === 0){
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFail());
            }
        } catch(e){
            dispatch(fetchRoleFail());
            console.log("fecthRoleStart error", e);
        }

    }
}
export const fetchRoleSuccess = (data) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: data
})
export const fetchRoleFail = () =>({
    type: actionTypes.FETCH_ROLE_FAIL
})

// Get Position
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try{
            dispatch({type: actionTypes.FETCH_START})
            let res = await handlegetAllCodes('position');
            if(res && res.errCode === 0){
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFail());
            }
        } catch(e){
            dispatch(fetchPositionFail());
            console.log("fecthPositionrStart error", e);
        }

    }
}
export const fetchPositionSuccess = (data) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: data
})
export const fetchPositionFail = () =>({
    type: actionTypes.FETCH_POSITION_FAIL
})

//  Get all user
export const fetchGetAllUser = () =>{
    return async (dispatch, getState) => {
        try{
            let res = await getAllUSers('all');
            if(res && res.errCode === 0){
                
                dispatch(fetchGetAllUserSuccess(res.data.reverse()))
            } else {
                dispatch(fetchGetAllUserFail());
            }
        } catch(e){
            dispatch(fetchGetAllUserFail());
            console.log("fecthGetAllUser error", e);
        }

    }
}
export const fetchGetAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_GET_ALL_USER_SUCCESS,
    data: data
})
export const fetchGetAllUserFail = () =>({
    type: actionTypes.FETCH_GET_ALL_USER_FAIL
})
