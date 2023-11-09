import actionTypes from './actionTypes';
import {handlegetAllCodes} from "../../services/userServiceAPI"

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