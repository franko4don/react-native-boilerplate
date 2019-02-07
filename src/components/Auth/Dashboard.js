import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {

        return (
           <ScrollView>
               <Text>Welcome</Text>
           </ScrollView>
        );


    }
}

const styles = {

}


const mapStateToProps = (state) => {

    return { };
};

export default connect(mapStateToProps, {  })(Dashboard);

