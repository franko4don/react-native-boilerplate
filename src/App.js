import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './redux/reducers';
import firebase from 'firebase';
import Router from './Router';
import settings from './redux/config';

class App extends Component {

    componentWillMount(){
        firebase.initializeApp(
            settings.firebase
        );
    }

    render() {

        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <Router />

            </Provider>
        )
    }
}
export default App;

