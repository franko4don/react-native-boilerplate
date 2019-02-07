import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { WHITE } from './../../style';

class ForgotPassword extends Component {


    constructor(props) {
        super(props);

    }

    render() {

        return (
            <ScrollView style={{ backgroundColor: WHITE }}>
                
            </ScrollView>
        );


    }
}

const styles = {
   
}

const mapStateToProps = (state) => {
 
    return {  };
};

export default connect(mapStateToProps, { })(ForgotPassword);
