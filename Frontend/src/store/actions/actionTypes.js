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
    FETCH_GET_ALL_USER_FAIL: 'FETCH_GET_ALL_USER_FAIL',
    FETCH_GET_TOP_DOCTOR_SUCCESS: ' FETCH_GET_TOP_DOCTOR_SUCCESS',
    FETCH_GET_TOP_DOCTOR_FAIL: ' FETCH_GET_TOP_DOCTOR_FAIL',
    

    //doctor
    FETCH_GET_ALL_DOCTORS_SUCCESS: 'FETCH_GET_ALL_DOCTORS_SUCCESS',
    FETCH_GET_ALL_DOCTORS_FAIL: 'FETCH_GET_ALL_DOCTORS_FAIL',
    CREATE_DOCTOR_INFO_SUCCESSFUL: 'CREATE_DOCTOR_INFO_SUCCESSFUL',
    CREATE_DOCTOR_INFO_FAILED: 'CREATE_DOCTOR_INFO_FAILED',
    GET_DETAIL_DOCTOR_INFO_SUCCESSFUL: 'GET_DETAIL_DOCTOR_INFO_SUCCESSFUL',
    GET_DETAIL_DOCTOR_INFO_FAILED: 'GET_DETAIL_DOCTOR_INFO_FAILED',
    CREATE_DOCTOR_SCHEDULE_SUCCESSFUL: 'CREATE_DOCTOR_SCHEDULE_SUCCESSFUL',
    CREATE_DOCTOR_SCHEDULE_FAILED: 'CREATE_DOCTOR_SCHEDULE_FAILED',
    GET_DOCTOR_SCHEDULE_SUCCESSFUL: 'GET_DOCTOR_SCHEDULE_SUCCESSFUL',
    GET_DOCTOR_SCHEDULE_FAILED: 'GET_DOCTOR_SCHEDULE_FAILED',
    GET_CLINIC_INFO_SUCCESSFUL: 'GET_CLINIC_INFO_SUCCESSFUL',
    GET_CLINIC_INFO_FAILED: 'GET_CLINIC_INFO_FAILED',

    
    // allcodes
    FETCH_GET_TIME_SUCCESS: 'FETCH_GET_TIME_SUCCESS',
    FETCH_GET_TIME_FAIL: 'FETCH_GET_TIME_FAIL',
    FETCH_DOCTOR_ALLCODE_SUCCESS:'FETCH_DOCTOR_ALLCODE_SUCCESS',
    FETCH_DOCTOR_ALLCODE_FAIL: 'FETCH_DOCTOR_ALLCODE_FAIL'

})

export default actionTypes;