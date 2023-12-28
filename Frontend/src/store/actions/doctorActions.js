import actionTypes from './actionTypes';
import {handleGetAllDoctors} from '../../services/doctorServiceAPI'

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