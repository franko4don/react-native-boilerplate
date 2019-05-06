import { LOADING } from './Types';


export const startLoading = () => {

    return {
        type: LOADING,
        payload: true
    }
};

export const stopLoading = () => {

    return {
        type: LOADING,
        payload: false
    }
};