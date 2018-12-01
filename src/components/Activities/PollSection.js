import React, { Component } from 'react';
import {
    Container, Header, Body,
    Content, Input, ListItem,
    Item, CheckBox, DatePicker,
    Button, Tab, Tabs, Radio,
    TabHeading, Badge, Thumbnail,
    Segment, CardItem, Left, Right,
    Card
} from 'native-base';
import { Image, View, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Text } from './../Reusables';
import { setActivePost, getComments, likePost } from './../../redux/actions';

import {
    logo, avatar, backdrop,
    SITE_COLOR, FACEBOOK_COLOR,
    TWITTER_COLOR, GOOGLE_COLOR,
    WHITE, FONT_FAMILY
} from './../../style';

class PollSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: 0
        }
    }

    selectOption(selected){
        this.setState({selected});
    }


    render() {

        const { sector, opinion, useravatar } = this.props;
        let image = null;
        if (useravatar != undefined && useravatar != "") {
            image = { uri: useravatar };
        } else {
            image = avatar;
        }
        return (
            <Card style={{ elevation: 0, borderTopWidth: 0, marginTop: 10, marginBottom: 10 }}>
                <CardItem>
                    <Left>
                        <Thumbnail source={avatar} />
                        <Body>
                            <Text style={{ fontWeight: 'bold' }}>David Benjamin</Text>
                            <Text note>{sector}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>

                    <Content>
                        <ListItem style={styles.listItemStyle}>
                            <Text>{opinion}</Text>
                        </ListItem>
                        <ListItem style={styles.listItemStyle}>
                            <Left>
                                <Radio onPress={() => this.selectOption(TRUE)} selectedColor={SITE_COLOR} selected={this.state.selected == TRUE} />
                                <Text style={{ marginLeft: 15 }}>Yes/Agree/True</Text>
                            </Left>


                        </ListItem>
                        <ListItem style={styles.listItemStyle}>

                            <Left>
                                <Radio onPress={() => this.selectOption(FALSE)} selectedColor={SITE_COLOR} selected={this.state.selected == FALSE} />
                                <Text style={{ marginLeft: 15 }}>No/Disagree/False</Text>
                            </Left>
                        </ListItem>

                        <ListItem style={styles.listItemStyle}>

                            <Left>
                                <Radio onPress={() => this.selectOption(UNDECIDED)} selectedColor={SITE_COLOR} selected={this.state.selected == UNDECIDED} />
                                <Text style={{ marginLeft: 15 }}>Undecided/Ambiguous</Text>
                            </Left>
                        </ListItem>
                    </Content>
                </CardItem>
                <CardItem style={{ flexDirection: 'row', backgroundColor: '#F1F1F1', paddingTop: 0, paddingBottom: 0, height: 50 }}>

                    <Button style={{ flex: 1 }} transparent>
                        <View style={{ flexDirection: 'row' }}>
                            <FontAwesomeIcon size={20} name="thumbs-o-up" />
                            <Text style={{ paddingLeft: 5, color: REACTION_COLOR }}>12 Likes</Text>
                        </View>
                    </Button>


                    <Button style={{ flex: 1 }} transparent>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon size={20} name="comment-outline" />
                            <Text style={{ paddingLeft: 5, color: REACTION_COLOR }}>4 Comments</Text>
                        </View>
                    </Button>

                    <Button style={{ flex: 1 }} transparent>
                        <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                            <Icon size={20} name="share" />
                            <Text style={{ paddingLeft: 5, color: REACTION_COLOR }}>10 Shares</Text>
                        </View>
                    </Button>

                </CardItem>
            </Card>
        );


    }
}

const TRUE = 1;
const FALSE = 2;
const UNDECIDED = 3;

const styles = {
    listItemStyle: {
        marginTop: 3,
        paddingTop: 3,
        paddingBottom: 3,
        marginBottom: 3,
        borderBottomWidth: 0
    }
}

const REACTION_COLOR = '#333333';


const mapStateToProps = (state) => {
    // console.log(state.auth);
    return {};
};

export default connect(mapStateToProps, {})(PollSection);

