import React, { Component } from "react";
import { Image, View, TouchableOpacity, ScrollView } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { calculateOpacity, encode } from './../../Helper';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';

import {

  Content,
  Item,
  Button,
  Label,
  Picker
} from "native-base";

import {
  logo,

  SITE_COLOR,
  FONT_FAMILY,
  WHITE
} from "./../../style";

import {
  profileUpdate,
  createProfile,
  getCountries,
  getStates,
  getLgas
} from "./../../redux/actions";
import { MaterialInput, AnimatedSpinner, Text } from "../Reusables";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: "Anambra",
      photo: {},
      name: ''
    };
  }

  createProfile() {
    let data = {
        firstname: this.props.firstname,
        lastname: this.props.lastname,
        phone: this.props.phone,
        photo: this.state.photo,
        country: this.props.country,
        state: this.props.userState,
    };
    this.props.createProfile(data, this.state.name);
  }

  pickImage() {
    ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
    }).then(image => {
        image['name'] = encode('f')+'.'+image.mime.split('/')[1];
        const Blob = RNFetchBlob.polyfill.Blob;
        const fs = RNFetchBlob.fs;
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;
        const fetch = RNFetchBlob.polyfill.Fetch
        fs.readFile(image.path, 'base64')
        .then((data) => {
            // / replace built-in fetch
            window.fetch = new Fetch({
                // enable this option so that the response data conversion handled automatically
                auto : true,
                // when receiving response data, the module will match its Content-Type header
                // with strings in this array. If it contains any one of string in this array, 
                // the response body will be considered as binary data and the data will be stored
                // in file system instead of in memory.
                // By default, it only store response data to file system when Content-Type 
                // contains string `application/octet`.
                binaryContentTypes : [
                    'image/',
                    'video/',
                    'audio/',
                    'foo/',
                ]
            }).build(data, { type: `${image.mime};BASE64` });
            return fetch;
            // return Blob.build(data, { type: `${image.mime};BASE64` });  
        })
        .then((blob) => {
            this.setState({photo: blob, name: image.name});
        });
    });
}

  componentWillMount() {
    this.props.getCountries();
    this.props.getStates();
  }

  renderButton() {
    if (!this.props.isLoading) {
      return <Text style={{ color: WHITE }}>Create</Text>;
    } else {
      return (
        <AnimatedSpinner
          type={"Wave"}
          size={25}
          color={WHITE}
          text={"Processing"}
          textStyle={{ color: WHITE }}
        />
      );
    }
  }

  renderCountries() {
    let countries = [];
    if (this.props.countries) {
      for (i in this.props.countries) {
        let country = this.props.countries[i];
        countries.push(
          <Picker.Item
            key={country.name}
            label={country.name}
            value={country.name}
          />
        );
      }
    }

    return countries;
  }

  renderStates() {
    let states = [];
    if (this.props.states) {
      for (i in this.props.states) {
        let state = this.props.states[i];
        states.push(
          <Picker.Item key={state.name} label={state.name} value={state.name} />
        );
      }
    }
    if (this.props.country == "Nigeria") {
      return (
        <View>
          <Label style={styles.labelStyle}>State</Label>
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<FontAwesomeIcon name="caret-down" />}
              style={{ width: undefined }}
              placeholder="Select State"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.props.userState}
              onValueChange={value =>
                this.props.profileUpdate({ prop: "userState", value: value })
              }
            >
              {states}
            </Picker>
          </Item>
        </View>
      );
    }
  }

  renderLgas() {
    let lgas = [];
    if (this.props.lgas) {
      for (i in this.props.lgas) {
        let lga = this.props.lgas[i];
        lgas.push(<Picker.Item key={lga} label={lga} value={lga} />);
      }
    }
    if (this.props.nationality_origin == "Nigeria") {
      return (
        <View>
          <Label style={styles.labelStyle}>Lga of residence/interest</Label>
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<FontAwesomeIcon name="caret-down" />}
              style={{ width: undefined }}
              placeholder="Select Lga"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.props.lga}
              onValueChange={value =>
                this.props.profileUpdate({ prop: "lga", value: value })
              }
            >
              {lgas}
            </Picker>
          </Item>
        </View>
      );
    }
  }


  render() {
    let buttoncolor = this.props.isLoading ? SITE_COLOR + calculateOpacity(60) : SITE_COLOR;
    return (
      <ScrollView style={{ backgroundColor: "#fff" }}>
        <View style={{ marginLeft: 15, marginRight: 15, marginTop: 20 }}>
          <Content>
          
            <MaterialInput
              value={this.props.firstName}
              label={"First Name"}
              placeholder={"First Name"}
              onChangeText={value => {
                this.props.profileUpdate({ prop: "firstname", value: value });
              }}
            />

            <MaterialInput
              value={this.props.lastName}
              label={"Last Name"}
              placeholder={"Last Name"}
              onChangeText={value => {
                this.props.profileUpdate({ prop: "lastname", value: value });
              }}
            />


            <MaterialInput
              value={this.props.phone}
              disabled={true}
              label={"Phone"}
              placeholder={"Phone"}
              onChangeText={value => {
                this.props.profileUpdate({ prop: "phone", value: value });
              }}
            />
            <Label style={styles.labelStyle}>Photo</Label>
            <Item regular>
                <TouchableOpacity style={{flex: 1, height: 45}} onPress={() => this.pickImage()}>
                    <Text>{this.state.photo.name}</Text>
                </TouchableOpacity>
            </Item>
            <View style={{marginLeft: 5}}>
            <Label style={styles.labelStyle}>Country</Label>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<FontAwesomeIcon name="caret-down" />}
                style={{ width: undefined }}
                placeholder="Select Country of origin"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.props.country}
                onValueChange={value =>
                  this.props.profileUpdate({
                    prop: "country",
                    value: value
                  })
                }
              >
                {this.renderCountries()}
              </Picker>
            </Item>

            {this.renderStates()}
            </View>
            <Button
              disabled={this.props.isLoading}
              block
              rounded
              onPress={() => this.createProfile()}
              style={{
                backgroundColor: buttoncolor,
                marginTop: 45,
                marginBottom: 20
              }}
            >
              {this.renderButton()}
            </Button>
          </Content>
        </View>
      </ScrollView>
    );
  }
}

const BORDER_COLOR = "#C4C4C4";

const styles = {
  editButtonStyle: {
    borderColor: SITE_COLOR,
    marginTop: -45,
    marginLeft: 75,
    borderRadius: 50,
    paddingRight: 7,
    paddingTop: 0,
    height: 33,
    paddingBottom: 0,
    paddingLeft: 7,
    backgroundColor: SITE_COLOR
  },

  dottedStyle: {
    borderBottomWidth: 1,
    borderRadius: 5,
    borderStyle: "dotted",
    borderColor: "#C4C4C4"
  },

  labelStyle: {
    marginBottom: 15,
    marginTop: 15,
    fontSize: 14,
    fontFamily: FONT_FAMILY,
    color: "#c4c4c4"
  },

  itemStyle: {
    borderColor: "#BDBDBD",
    borderBottomWidth: 1
  }
};

const tabIconSize = 20;

const mapStateToProps = state => {
  const { lastname, firstname, country, userState, photo, phone} = state.profile;
  const { isLoading } = state.loading;
  const { countries, states, lgas } = state.location;
  
  return {
    lastname, firstname, phone, country, userState, photo, isLoading,
    countries,states,lgas,
  };
};

export default connect(
  mapStateToProps,
  { createProfile, profileUpdate, getCountries, getStates, getLgas }
)(CreateProfile);
