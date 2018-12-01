import { AsyncStorage } from 'react-native';
import axios from 'axios';
import {
    POLL_UPDATE, GET_POLLS, SET_ACTIVE_POLL
} from './../actions/Types';

import { base_url } from './../config';
import { Actions } from 'react-native-router-flux';
import { filterPost } from '../../Helper';

const INITIAL_STATE = {
    opinion: "",
    sector: "",
    expireAt: "",
    responseLimit: 1000,
    activePoll: {},
    polls: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case POLL_UPDATE:

            return { ...state, [action.payload.prop]: action.payload.value };

        case GET_POLLS:

            return { ...state, polls: action.payload };

        case SET_ACTIVE_POLL:
            return { ...state, activePoll: filterPost(action.payload, state.polls) }

        default:
            return state;
    }
};
