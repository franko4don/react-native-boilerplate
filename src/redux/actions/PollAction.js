import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import settings from './../config';
import { AsyncStorage } from "react-native";


import {
    POLL_UPDATE, GET_ERRORS, SET_ACTIVE_POLL,
    GET_MESSAGE, GET_POLLS
} from './Types';

import { startLoading, stopLoading } from './LoadingAction';

export const pollUpdate = (text) => {

    return {
        type: POLL_UPDATE,
        payload: text
    }
};

export const createPoll = (data) => {
    return (dispatch) => {
        dispatch(startLoading());
        const { api_url } = settings;
        axios.post(api_url + 'polls', data)
            .then(res => {
                Actions.pop();
                dispatch(stopLoading());
                dispatch(getPolls());
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

export const likePoll = (uuid) => {
    return (dispatch) => {

        const { api_url } = settings;
        axios.post(api_url + 'reactions/' + uuid, { post: uuid })
            .then(res => {

                dispatch(getPolls());
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

                console.log(err.response);
            })
    }
};

export const unlikePoll = (uuid) => {
    return (dispatch) => {

        const { api_url } = settings;
        axios.delete(api_url + 'reactions/' + uuid)
            .then(res => {

                dispatch(getPolls());
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

                console.log(err.response);
            })
    }
};

export const getPolls = () => {
    return (dispatch) => {

        const { api_url } = settings;
        axios.get(api_url + 'polls')
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: GET_POLLS,
                    payload: res.data
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

                console.log(err.response);
            })
    }
}


export const setActivePoll = (uuid) => {
    return (dispatch) => {
        dispatch({
            type: SET_ACTIVE_POLL,
            payload: uuid
        });
    }
}


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
