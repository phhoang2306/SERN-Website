import actionTypes from '../actions/actionTypes';

const initialState = {
   doctors: []
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
        default:
            return state;
    }
}

export default doctorReducer;