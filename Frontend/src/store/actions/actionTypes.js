const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',
    CREATE_USER_SUCCESSFUL: 'CREATE_USER_SUCCESSFUL',
    CREATE_USER_FAILED: 'CREATE_USER_FAILED',
    GET_ALL_USER: 'GET_ALL_USERS',
    DELETE_USER_SUCCESSFUL: 'DELETE_USER_SUCCESSFUL',
    DELETE_USER_FAILED: 'DELETE_USER_FAILED',
    EDIT_USER_SUCCESSFUL: 'EDIT_USER_SUCCESSFUL',
    EDIT_USER_FAILED: 'EDIT_USER_FAILED',
    
    //admin
    FETCH_START: 'FETCH_START',
    FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
    FETCH_GENDER_FAIL :'FETCH_GENDER_FAIL',
    FETCH_ROLE_SUCCESS: "FETCH_ROLE_SUCCESS",
    FETCH_ROLE_FAIL :'FETCH_ROLE_FAIL',
    FETCH_POSITION_SUCCESS: "FETCH_POSITION_SUCCESS",
    FETCH_POSITION_FAIL :'FETCH_POSITION_FAIL',
    FETCH_GET_ALL_USER_SUCCESS: 'FETCH_GET_ALL_USER_SUCCESS',
    FETCH_GET_ALL_USER_FAIL: 'FETCH_GET_ALL_USER_FAIL'
})

export default actionTypes;