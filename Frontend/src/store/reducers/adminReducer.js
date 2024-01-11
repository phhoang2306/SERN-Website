import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    doctors: [],
    time: [],
    payment: [],
    province: [],
    price: [],
    resAdmin: '',
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
         case actionTypes.FETCH_GET_TIME_SUCCESS:
            state.time = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_GET_TIME_FAIL:
            state.time = [];
            return {
                ...state
            }
        case actionTypes.FETCH_DOCTOR_ALLCODE_SUCCESS:
            state.resAdmin = action.res
            console.log(state.resAdmin)
            return {
                ...state
            }
        case actionTypes.FETCH_DOCTOR_ALLCODE_FAIL:
            state.resAdmin = [];
            return {
                ...state
            }
            
        default:
            return state;
    }
}

export default adminReducer;