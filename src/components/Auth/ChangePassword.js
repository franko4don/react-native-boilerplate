import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import { connect } from 'react-redux';


import {WHITE} from './../../style';

class ChangePassword extends Component {

    constructor(props) {
        super(props);

    }


    render() {

        
        return (
            <ScrollView style={{ flex: 1, backgroundColor: WHITE }}>
               
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
    }
}

const mapStateToProps = (state) => {
  
    return {  };
};

export default connect(mapStateToProps, { })(ChangePassword);
