import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import firebase from 'firebase';

import {
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS, LOGIN_USER_FAIL,
    LOADING, LOGIN_UPDATE, REGISTER_UPDATE,
    CLEAR_ERRORS, GET_ERRORS, GET_MESSAGE,

} from './Types';

import { startLoading, stopLoading } from './LoadingAction';

export const registerUpdate = (text) => {

    return {
        type: REGISTER_UPDATE,
        payload: text
    }
};

export const loginUpdate = (text) => {

    return {
        type: LOGIN_UPDATE,
        payload: text
    }
};

export const passwordChanged = (text) => {

    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
};

export const loginUser = (data, from = "login") => {
    
    return (dispatch) => {
        const {email, password} = data;
        clearErrors(dispatch);
        dispatch(startLoading());
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user)=>{
                dispatch(stopLoading());
                loginUserSuccess(dispatch, data);

            })
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    dispatch(stopLoading());
                    loginUserSuccess(dispatch, data);
                })
                .catch(() => {
                    dispatch(stopLoading());
                    dispatch({
                        type: GET_ERRORS,
                        payload: 'Authentication Failed'
                    });
                });
            })
      
    }
};


export const logoutUser = () => {
    return (dispatch) => {
       
    }
};


const clearErrors = (dispatch) => {
    dispatch({
        type: GET_ERRORS,
        payload: ""
    });
}

const clearMessage = (dispatch) => {
    dispatch({
        type: GET_MESSAGE,
        payload: ''
    });
}


const loginUserFail = (dispatch) => {
    dispatch({
        type: LOGIN_USER_FAIL

    });
    stopLoading();
};
