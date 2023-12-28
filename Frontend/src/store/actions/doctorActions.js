import actionTypes from './actionTypes';
import {handleGetAllDoctors, handleCreeateDoctorInfo} from '../../services/doctorServiceAPI'

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