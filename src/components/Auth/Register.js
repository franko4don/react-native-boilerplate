import React, { Component } from 'react';
import { Container, Header, Body, Content, Text, Button, Label } from 'native-base';
import { Image, View, TouchableOpacity, ScrollView} from 'react-native';
import moment from 'moment';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { registerUpdate, registerUser } from './../../redux/actions';
import { Spinner, MaterialInput, AnimatedSpinner } from './../Reusables';
import { calculateOpacity } from './../../Helper';
import { SITE_COLOR,WHITE, FONT_FAMILY} from './../../style';


class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chosenDate: new Date(),
            accept: false,
            isSigninInProgress: false,
            userInfo: {}
        };

    }

    registerUser() {
        data = {
            email: this.props.email,
            password: this.props.password,
            phone: this.props.phone,
            provider: 'email',
            tosAgreement: this.props.tosAgreement,
            dob: moment(this.props.dob).format('DD/MM/YYYY'),
        }
        this.props.registerUser(data);
    }

    renderButton() {
        if (!this.props.isLoading) {

            return (
                <Text>CREATE ACCOUNT</Text>
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
        let buttoncolor = !this.props.tosAgreement || this.props.isLoading ? SITE_COLOR + calculateOpacity(60) : SITE_COLOR;

        return (
            <ScrollView style={{ flex: 1, backgroundColor: WHITE }}>
                <View style={{ alignSelf: 'center', marginBottom: 10, marginTop: 20 }}>
                    <Text style={{ fontWeight: '500', fontSize: 18, color: '#4F4F4F', fontFamily: FONT_FAMILY }}>User Signup</Text>
                </View>
                <View style={{ marginTop: 25, alignSelf: 'center' }}>
                    <Text style={{ color: 'red' }}>{this.props.error}</Text>
                </View>
                <Content style={{ marginBottom: 30, marginLeft: 15, marginRight: 15, marginTop: 20 }}>


                    <MaterialInput
                        value={this.props.email}
                        label={"Email Address"}
                        placeholder={"Enter Email"}
                        onChangeText={value => { this.props.registerUpdate({ prop: 'email', value: value }) }}
                    />

                    <MaterialInput
                        value={this.props.password}
                        label={"Password"}
                        secureTextEntry
                        placeholder={"Enter Password"}
                        onChangeText={value => { this.props.registerUpdate({ prop: 'password', value: value }) }}
                    />

                    <MaterialInput
                        value={this.props.phone}
                        label={"Phone Number"}
                        placeholder={"Enter Phone number"}
                        onChangeText={value => { this.props.registerUpdate({ prop: 'phone', value: value }) }}
                    />

                    <Button
                        disabled={this.props.isLoading} block rounded
                        onPress={() => alert('Hello')}
                        style={{ backgroundColor: buttoncolor, marginTop: 45, marginBottom: 20 }}>
                        {this.renderButton()}
                    </Button>

                    
                </Content>
            </ScrollView>
        );


    }
}

const BORDER_COLOR = '#C4C4C4';

const styles = {
    inputStyle: {
        marginTop: 10,
        marginBottom: 10,
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
    const { } = state.auth;
    const { isLoading } = state.loading;
    const { error } = state.errors;

    return {isLoading, error };
};

export default connect(mapStateToProps, { registerUpdate})(Register);

