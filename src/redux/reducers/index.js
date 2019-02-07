import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ErrorReducer from './ErrorReducer';
import LoadingReducer from './LoadingReducer';


export default combineReducers({
    auth: AuthReducer,
    errors: ErrorReducer,
    loading: LoadingReducer,
});