import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import settings from './../config';
import { AsyncStorage } from "react-native";


import {
    PROFILE_UPDATE, GET_ERRORS,
    GET_MESSAGE, PROFILE_UPDATE_SUCCESS,
    GET_MY_PROFILE, PROFILE_VIEW, GET_USER_PROFILE
} from './Types';

import { startLoading, stopLoading } from './LoadingAction';

export const profileUpdate = (text) => {

    return {
        type: PROFILE_UPDATE,
        payload: text
    }
};

export const getMyProfile = (uuid) => {
    return (dispatch) => {

        const { api_url } = settings;
        axios.get(api_url + 'profiles/' + uuid)
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: GET_MY_PROFILE,
                    payload: res.data.profile[0]
                });
            })
            .catch(err => {

                if (err.response.status == 404) {
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data.Error
                    });
                }

                if (err.response.status == 401) {
                    dispatch({
                        type: GET_MESSAGE,
                        payload: err.response.data.message
                    });
                }

                console.log(err.response.data);
            })
    }
};


export const getUserProfile = (uuid) => {
    return (dispatch) => {
        Actions.userprofile();
        const { api_url } = settings;
        axios.get(api_url + 'profiles/' + uuid)
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: GET_USER_PROFILE,
                    payload: res.data.profile[0]
                });
            })
            .catch(err => {

                if (err.response.status == 404) {
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data.Error
                    });
                }

                if (err.response.status == 401) {
                    dispatch({
                        type: GET_MESSAGE,
                        payload: err.response.data.message
                    });
                }

                console.log(err.response.data);
            })
    }
};

export const createProfile = (uuid = "", data) => {
    return (dispatch) => {

        const { api_url } = settings;
        clearErrors(dispatch);
        dispatch(startLoading());

        axios.post(api_url + 'profiles', data)
            .then(res => {
                // console.log(res.data);
                dispatch(stopLoading());
                dispatch({
                    type: PROFILE_VIEW
                });
                Actions.drawer({ type: 'reset' });
                dispatch(getMyProfile(uuid));
            })
            .catch(err => {
                dispatch(stopLoading());
                if (err.response.status == 404) {
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data.Error
                    });
                }

                if (err.response.status == 401) {
                    dispatch({
                        type: GET_MESSAGE,
                        payload: err.response.data.message
                    });
                }

                console.log(err.response);
            })
    }
};

export const saveProfile = (uuid, data) => {
    return (dispatch) => {
        
        const { api_url } = settings;
        clearErrors(dispatch);
        dispatch(startLoading());
        axios.put(api_url + 'profiles', data)
            .then(res => {
                console.log(res);
                dispatch(stopLoading());

                dispatch(getMyProfile(uuid));
                Actions.pop();
            })
            .catch(err => {
                dispatch(stopLoading());
                if (err.response.status == 404) {
                    dispatch(createProfile(uuid, data));
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data.Error
                    });
                }

                if (err.response.status == 401) {
                    dispatch({
                        type: GET_MESSAGE,
                        payload: err.response.data.message
                    });
                }

                console.log(err.response);
            })
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

const profileUpdateSuccess = (dispatch, profile) => {
    dispatch({
        type: PROFILE_UPDATE_SUCCESS,
        payload: profile
    });

};
