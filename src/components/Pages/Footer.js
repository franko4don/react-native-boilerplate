import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { logo, SITE_COLOR, FACEBOOK_COLOR, TWITTER_COLOR, GOOGLE_COLOR, WHITE } from './../../style';

const Footer = () => {
    return (
        <View style={styles.footer}>
            <View style={styles.footercontent}>
                <TouchableOpacity onPress={() => Actions.faq()}>
                    <Text style={styles.footerlinks}>Help & FAQ</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Actions.tos()}>
                    <Text style={styles.footerlinks}>Terms Of Use</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Actions.privacy()}>
                    <Text style={styles.footerlinks}>Privacy Policy</Text>
                </TouchableOpacity>
            </View>
            <View style={{ margin: 15 }}>
                <Text style={{ textAlign: 'center', fontSize: 12 }}>
                    © 2018 GClout | All copyrights rights reserved
                </Text>
            </View>
        </View>
    );


};

const styles = {
    footer: {
        marginTop: 40,
        borderTopWidth: 3,
        borderTopColor: SITE_COLOR
    },

    footercontent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
    },

    footerlinks: {
        fontSize: 14
    }

}

export default Footer;
