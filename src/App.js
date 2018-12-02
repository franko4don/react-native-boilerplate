import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './redux/reducers';
import { AsyncStorage, View } from "react-native";
import firebase from 'firebase';

import Router from './Router';


class App extends Component {

    componentWillMount(){
        firebase.initializeApp(
            {
                apiKey: "AIzaSyDUop2sO4fa4aL7SFIOh0TbNE-HFJw2hTg",
                authDomain: "hulker-a7a24.firebaseapp.com",
                databaseURL: "https://hulker-a7a24.firebaseio.com",
                projectId: "hulker-a7a24",
                storageBucket: "hulker-a7a24.appspot.com",
                messagingSenderId: "271802644297"
              }
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

