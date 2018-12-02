import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import settings from './../config';
import { AsyncStorage } from "react-native";
import firebase from 'firebase';

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

export const createProfile = (data, name, mime = 'image/jpeg') => {
    return (dispatch) => {
        dispatch(startLoading());
        var storageRef = firebase.storage().ref();
        console.log(name);
        // Create the file metadata
        var metadata = {
        contentType: mime
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = storageRef.child('images/' + name).put(data.photo, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function(snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');

                switch (snapshot.state) {

                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            }, function(error) {

                dispatch(stopLoading());
                switch (error.code) {
                    case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                    case 'storage/canceled':
                    // User canceled the upload
                    break;

                    case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
                }
        }, function() {
            console.log("Upload completed");
        // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                clearErrors(dispatch);
                dispatch(startLoading());
                data.photo = downloadURL;
                const {currentUser} = firebase.auth();
                firebase.database().ref(`/users/${currentUser.uid}/profile`)
                    .push(data);
                dispatch(stopLoading());
                Actions.profile({type: 'reset'});
                console.log('File available at', downloadURL);
            });
        });
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
