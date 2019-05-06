import React, { Component } from 'react';
import { Content, Button} from 'native-base';
import { Image, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { loginUpdate, loginUser, initializeUser } from './../../redux/actions';
import {MaterialInput, AnimatedSpinner, Text } from './../Reusables';

import { logo, SITE_COLOR, WHITE } from './../../style';
import { calculateOpacity } from './../../Helper';
import { Actions } from 'react-native-router-flux';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSigninInProgress: false,
            userInfo: {}
        }
    }

    componentWillMount() {
    
    }



    loginUser() {
        let data = {
            email: this.props.email,
            password: this.props.password,
        }
        this.props.loginUser(data);
    }



    renderButton() {
        if (!this.props.isLoading) {

            return (
                <Text style={{color: WHITE}}>LOGIN</Text>
            );
        } else {
            return (
                <AnimatedSpinner
                    type={"Wave"}
                    size={25}
                    color={WHITE}
                    text={'Processing'}
                    textStyle={{ color: WHITE }}
                />);
        }
    }


    render() {

        let buttoncolor = this.props.isLoading ? SITE_COLOR + calculateOpacity(60) : SITE_COLOR;
        return (
            <ScrollView style={{ flex: 1, backgroundColor: WHITE }}>
                
                <View style={{ alignSelf: 'center', marginBottom: 10, marginTop: 20 }}>
                    <Text style={{ fontSize: 18, color: '#4F4F4F' }}>Login / Signup</Text>
                </View>

                <Image
                 source={logo}
                 style={{width: 70, height: 70, marginTop: 20, alignSelf: 'center'}}
                 
                />
                <View style={{ marginTop: 25, alignSelf: 'center' }}>
                    <Text style={{ color: 'red' }}>{this.props.error}</Text>
                </View>
                <Content style={{ marginLeft: 15, marginRight: 15, marginTop: 20 }}>
                    <MaterialInput
                        value={this.props.email}
                        label={"Email Address"}
                        placeholder={"Enter Email"}
                        onChangeText={value => { this.props.loginUpdate({ prop: 'email', value: value }) }}
                    />
                    <MaterialInput
                        value={this.props.password}
                        label={"Password"}
                        secureTextEntry
                        placeholder={"Enter Password"}
                        onChangeText={value => { this.props.loginUpdate({ prop: 'password', value: value }) }}
                    />

                    <Button
                        disabled={this.props.isLoading} block rounded
                        onPress={() => alert('Hello')}
                        style={{ backgroundColor: buttoncolor, marginTop: 45, marginBottom: 20 }}>
                        {this.renderButton()}
                    </Button>

                    <TouchableOpacity onPress={() => Actions.register()}>
                        <Text style={{textAlign: 'center'}}>No Account yet? Register</Text>
                    </TouchableOpacity>
                </Content>
            </ScrollView>
        );


    }
}

const BORDER_COLOR = '#C4C4C4';

const styles = {
    inputStyle: {

        borderColor: BORDER_COLOR,
    },

    iconViewStyle: {
        borderRadius: 100,
        padding: 7
    },

    linkedinViewStyle: {
        borderWidth: 0,

    }
}

const mapStateToProps = (state) => {
    const { auth, email, password } = state.auth;
    const { isLoading } = state.loading;
    const { error } = state.errors;
    return { auth, email, password, isLoading, error };
};

export default connect(mapStateToProps, { loginUpdate, loginUser, initializeUser })(Login);

