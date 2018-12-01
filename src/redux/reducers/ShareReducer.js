import {
    TOGGLE_SHARE_MODAL, SET_SHARABLE_CONTENT
} from './../actions/Types';

const INITIAL_STATE = {
    content: {},
    shareVisibility: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_SHARE_MODAL:
            return { ...state, shareVisibility: action.payload };

        default:
            return state;
    }
};