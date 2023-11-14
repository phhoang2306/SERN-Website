import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    res: '',
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            console.log(action)
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.CREATE_USER_SUCCESSFUL:
            return {
                ...state,
                res: action.res
            }
        case actionTypes.CREATE_USER_FAILED:
            return {
                ...state,
                res: action.res
            }
        case actionTypes.EDIT_USER_SUCCESSFUL:
                return {
                    ...state,
                    res: action.res
                }
        case actionTypes.EDIT_USER_FAILED:
                return {
                    ...state,
                    res: action.res
                }
        case actionTypes.DELETE_USER_SUCCESSFUL:
            return {
                ...state,
                res: action.res
            }
        case actionTypes.DELETE_USER_FAILED:
            return {
                ...state,
                res: action.res
            }
        
        default:
            return state;
    }
}

export default userReducer;