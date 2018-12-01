import React, { Component } from 'react';
import { Container, Header, Body, Content, Input, ListItem, Item, CheckBox, DatePicker, Button, Label } from 'native-base';
import { Image, View, TouchableOpacity, ScrollView, NativeModules } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import LinkedInModal from 'react-native-linkedin'
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUpdate, loginUser, initializeUser } from './../../redux/actions';
import { Spinner, MaterialInput, AnimatedSpinner, Text } from './../Reusables';

import { logo, SITE_COLOR, FACEBOOK_COLOR, TWITTER_COLOR, GOOGLE_COLOR, WHITE, FONT_FAMILY } from './../../style';
import { calculateOpacity } from './../../Helper';

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
            provider: 'email'
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
                    <Text style={{ fontWeight: '500', fontSize: 18, color: '#4F4F4F', fontFamily: FONT_FAMILY }}>User Login</Text>
                </View>
                <View style={{ marginTop: 25, alignSelf: 'center' }}>
                    <Text style={{ color: 'red' }}>{this.props.error}</Text>
                </View>
                <Content style={{ marginLeft: 15, marginRight: 15, marginTop: 40 }}>
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
                        onPress={() => this.loginUser()}
                        style={{ backgroundColor: buttoncolor, marginTop: 15 }}>
                        {this.renderButton()}
                    </Button>

                    <TouchableOpacity onPress={() => Actions.forgotpassword()} style={{ marginTop: 20 }}>
                        <Text style={{ textAlign: 'center' }}>Forgot Password ?</Text>
                    </TouchableOpacity>

                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 15, alignSelf: 'center' }}>
                        <Text>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => Actions.register()}>
                            <Text style={{ color: SITE_COLOR }}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

            
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

