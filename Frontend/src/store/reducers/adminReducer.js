import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    genders: [],
    roles: [],
    positions: []
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
            state.postions = [];
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;