import actionTypes from './actionTypes';
import {handleGetAllDoctors, handleCreeateDoctorInfo,
        handleGetDetailDoctor, handleCreateSchedule,
        handleGetDoctorSchedule} from '../../services/doctorServiceAPI'

//  Get all user
export const fetchGetAllDoctors = () =>{
    return async (dispatch, getState) => {
        try{
            let res = await handleGetAllDoctors();
            if(res && res.errCode === 0){
                dispatch(fetchGetAllDoctorsSuccess(res))
            } else {    
                dispatch(fetchGetAllDoctorsFail());
            }
        } catch(e){
            dispatch(fetchGetAllDoctorsFail());
            console.log("fecthGetAllDoctors error", e);
        }

    }
}
export const fetchGetAllDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_GET_ALL_DOCTORS_SUCCESS,
    data: data.data
})
export const fetchGetAllDoctorsFail = () =>({
    type: actionTypes.FETCH_GET_ALL_DOCTORS_FAIL
})

// Create doctor's information
export const creatDoctorInfo = (data) =>{
    return async (dispatch, getState) =>{
        try{
            let res = await handleCreeateDoctorInfo(data);
            if (res && res.errCode === 0) {
                dispatch(createDoctorInfoSuccessful(res));
            } else{
                dispatch(createDoctorInfoFailed(res));
            }
        }catch(e){
            dispatch(createDoctorInfoFailed(e));
            console.log("Error create doctor's information ", e)
        }
    }
}
export const createDoctorInfoSuccessful = (res) => ({
    type: actionTypes.CREATE_DOCTOR_INFO_SUCCESSFUL,
    res: res
})
export const createDoctorInfoFailed = (res) => ({
    type: actionTypes.CREATE_DOCTOR_INFO_FAILED,
    res: res
})

//Get detail doctor's information
export const getDetailDoctor = (id) =>{
    return async (dispatch, getState) =>{
        try{
            let res = await handleGetDetailDoctor(id);
            if (res && res.errCode === 0) {
                dispatch(getDetailDoctorSuccessful(res));
            } else{
                dispatch(getDetailDoctorFailed());
            }
        }catch(e){
            dispatch(getDetailDoctorFailed());
            console.log("Error get detail doctor's information ", e)
        }
    }
}
export const getDetailDoctorSuccessful = (data) => ({
    type: actionTypes.GET_DETAIL_DOCTOR_INFO_SUCCESSFUL,
    res: data
})
export const getDetailDoctorFailed = () => ({
    type: actionTypes.GET_DETAIL_DOCTOR_INFO_FAILED,
})

// Create doctor schedule 
export const creatDoctorSchedule = (data) =>{
    return async (dispatch, getState) =>{
        try{
            let res = await handleCreateSchedule(data);
            if (res && res.errCode === 0) {
                dispatch(createDoctorScheduleSuccessful(res));
            } else{
                dispatch(createDoctorScheduleFailed(res));
            }
        }catch(e){
            dispatch(createDoctorScheduleFailed(e));
            console.log("Error create doctor's schedule ", e)
        }
    }
}
export const createDoctorScheduleSuccessful = (res) => ({
    type: actionTypes.CREATE_DOCTOR_SCHEDULE_SUCCESSFUL,
    res: res
})
export const createDoctorScheduleFailed = (res) => ({
    type: actionTypes.CREATE_DOCTOR_SCHEDULE_FAILED,
    res: res
})

// Get doctor schedule
export const getDoctorSchedule = (id, date) =>{
    return async (dispatch, getState) =>{
        try{
            let res = await handleGetDoctorSchedule(id, date);
            if (res && res.errCode === 0) {
                dispatch(getDoctorScheduleSuccessful(res.data));
            } else{
                dispatch(getDoctorScheduleFailed(res));
            }
        }catch(e){
            dispatch(getDoctorScheduleFailed(e));
            console.log("Error get doctor's schedule ", e)
        }
    }
}
export const getDoctorScheduleSuccessful = (res) => ({
    type: actionTypes.GET_DOCTOR_SCHEDULE_SUCCESSFUL,
    res : res
})
export const getDoctorScheduleFailed = (res) => ({
    type: actionTypes.GET_DOCTOR_SCHEDULE_FAILED,
    res: res
})
