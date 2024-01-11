import actionTypes from '../actions/actionTypes';

const initialState = {
    doctors: [],
    res: [],
    doctor_data: '',
    schedule: []
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
        case actionTypes.CREATE_DOCTOR_SCHEDULE_SUCCESSFUL:
            state.res = action.res;
            return {
                ...state
            }
        case actionTypes.CREATE_DOCTOR_SCHEDULE_FAILED:
            state.res = action.res;
            return {
                ...state
            }
        case actionTypes.GET_DOCTOR_SCHEDULE_SUCCESSFUL:
            state.schedule = action.res;
            console.log(state.schedule)
            return {
                ...state
            }
        case actionTypes.GET_DOCTOR_SCHEDULE_FAILED:
            state.schedule  = []
            return {
                ...state
            }
        default:
            return state;
    }
}

export default doctorReducer;