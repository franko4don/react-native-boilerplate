import React, { Component } from 'react';
import {
    Container, Header, Body,
    Content, Input, ListItem,
    Item, CheckBox, DatePicker,
    Button, Tab, Tabs,
    TabHeading, Badge, Thumbnail,
    Segment
} from 'native-base';
import { Image, View, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Dash from 'react-native-dash';
import Post from './../Activities/Post';
import Article from './Article';
import { Text } from './../Reusables';

import { getMyProfile } from './../../redux/actions';

import {
    logo, avatar, backdrop,
    SITE_COLOR, FACEBOOK_COLOR,
    TWITTER_COLOR, GOOGLE_COLOR,
    WHITE, FONT_FAMILY
} from './../../style';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeSegment: POST
        }
    }

    componentDidMount() {
       
    }

    render() {
        let image = avatar;
        if (this.props.profile.photo != '') {
            image = { uri: this.props.profile.photo }
        }

        return (
            <ScrollView style={{ backgroundColor: WHITE }}>

                <Text>Login success full</Text>
                <TouchableOpacity>
                    <Text>Logout</Text>
                </TouchableOpacity>

            </ScrollView>
        );


    }
}

const BORDER_COLOR = '#C4C4C4';

const styles = {
    editButtonStyle: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: SITE_COLOR,
        marginTop: -40,
        marginRight: 15
    },

    dottedStyle: {
        borderBottomWidth: 1,
        borderRadius: 5,
        borderStyle: 'dotted',
        borderColor: '#C4C4C4'
    },

    politicalTitleStyle: {
        fontFamily: FONT_FAMILY,
        textAlign: 'center',
        fontSize: 12
    },

    politicalHeadNameStyle: {
        fontFamily: FONT_FAMILY,
        textAlign: 'center',
        fontSize: 14
    },

    postArticleSegmentStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    buttonSegmentStyle: {
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: '#fff',
        borderColor: SITE_COLOR,
        borderWidth: 1,
        flex: 1,
        justifyContent: 'center'
    },

    thumbnailStyle: {
        alignSelf: 'center'
    }


}

const tabIconSize = 20;

const color = '#333333';

const headingcolor = '#034D79';

const POST = 1;

const ARTICLE = 2;

const LINE_COLOR = '#C4C4C4';

const mapStateToProps = (state) => {
    const { profile } = state.profile;
    const { email, phone, dob, uuid } = state.auth.user;
    return { profile, email, phone, dob, uuid };
};

export default connect(mapStateToProps, { getMyProfile })(Profile);

