import actionTypes from '../actions/actionTypes';

const initialState = {
    doctors: [],
    res: [],
    doctor_data: ''
}

const doctorReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GET_ALL_DOCTORS_SUCCESS:
            state.doctors = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_GET_ALL_DOCTORS_FAIL:
            state.doctors = [];
            return {
                ...state
            }
        case actionTypes.CREATE_DOCTOR_INFO_SUCCESSFUL:
            state.res = action.res;
            return {
                ...state
            }
        case actionTypes.CREATE_DOCTOR_INFO_FAILED:
            state.res = action.res;
            return {
                ...state
            }
        case actionTypes.GET_DETAIL_DOCTOR_INFO_SUCCESSFUL:
            state.doctor_data = action.res;
            return {
                ...state
            }
        case actionTypes.GET_DETAIL_DOCTOR_INFO_FAILED:
            state.doctor_data  = []
            return {
                ...state
            }
        default:
            return state;
    }
}

export default doctorReducer;