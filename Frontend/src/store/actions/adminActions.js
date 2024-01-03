import actionTypes from './actionTypes';
import {handlegetAllCodes} from "../../services/userServiceAPI"
import {getAllUSers} from "../../services/userServiceAPI"
import { handleGetTopDoctor } from '../../services/doctorServiceAPI';

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

// Get top doctor
export const fetchGetTopDoctors = (limit) =>{
    return async (dispatch, getState) => {
        try{
            let res = await  handleGetTopDoctor(limit);
            if(res && res.errCode === 0){
                
                dispatch(fetchGetTopDoctorSuccess(res))
            } else {
                dispatch(fetchGetTopDoctorFail());
            }
        } catch(e){
            dispatch(fetchGetTopDoctorFail());
            console.log("fecthGetAllUser error", e);
        }
    }
}
export const fetchGetTopDoctorSuccess = (res) => ({
    type: actionTypes.FETCH_GET_TOP_DOCTOR_SUCCESS,
    data: res.data
})
export const fetchGetTopDoctorFail = () => ({
    type: actionTypes.FETCH_GET_TOP_DOCTOR_FAIL,
})


// Get Position
export const fetchTimeStart = () => {
    return async (dispatch, getState) => {
        try{
            let res = await handlegetAllCodes('time');
            if(res && res.errCode === 0){
                dispatch(fetchTimeSuccess(res.data))
            } else {
                dispatch(fetchTimeFail());
            }
        } catch(e){
            dispatch(fetchTimeFail());
            console.log("fecthTimeStart error", e);
        }

    }
}
export const fetchTimeSuccess = (data) => ({
    type: actionTypes.FETCH_GET_TIME_SUCCESS,
    data: data
})
export const fetchTimeFail = () =>({
    type: actionTypes.FETCH_GET_TIME_FAIL
})