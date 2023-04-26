import actionTypes from './actionTypes';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})
export const userLoginSucess=(useInfo)=>({
    type:actionTypes.USER_LOGIN_SUCCESS,
    useInfo:useInfo
})
export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})