import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    doctors: [],
    res: '',
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_START:
            state.isLoading = true;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data
            state.isLoading = false;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAIL:
            state.isLoading = false;
            state.genders = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data
            state.isLoading = false;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAIL:
            state.isLoading = false;
            state.roles = [];
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data
            state.isLoading = false;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAIL:
            state.isLoading = false;
            state.positions = [];
            return {
                ...state
            }
        case actionTypes.FETCH_GET_ALL_USER_SUCCESS:
            state.users = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_GET_ALL_USER_FAIL:
            state.users = [];
            return {
                ...state
            }
        case actionTypes.FETCH_GET_TOP_DOCTOR_SUCCESS:
            state.doctors = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_GET_TOP_DOCTOR_FAIL: 
            state.doctors = []
            return {
                ...state,
            } 
        default:
            return state;
    }
}

export default adminReducer;