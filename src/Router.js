import React, { Component } from 'react';
import { Scene, Router, Actions, Modal } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

import {
    ORANGE, iconColor
} from './components/Reusables/styles';
import { avatar, logo, SITE_COLOR, FACEBOOK_COLOR, TWITTER_COLOR, GOOGLE_COLOR, WHITE } from './style';
import {Text} from './components/Reusables';
import {Image} from 'react-native';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';

class RouterComponent extends Component {
    constructor(props) {
        super();
       
    }

    AppLogo = () => {
        return (
            <Image
                source={logo}
                style={{ width: 30, height: 30, marginLeft: 10 }}
            />

        );
    }


    render() {

        return (
            <Router>

                <Scene key="root" hideNavBar>
                        
                    <Scene
                        key="auth"
                        navigationBarStyle={styles.commonNavigationBarStyle}>
                        <Scene key="login" onLeft={() => console.log('hger')} renderLeftButton={this.AppLogo()} component={Login} />
                       
                        <Scene key="forgotpassword" onLeft={() => console.log('hger')} renderLeftButton={this.AppLogo()} component={ForgotPassword} />
                        
                        <Scene key="register" onLeft={() => console.log('hger')} renderLeftButton={this.AppLogo()} component={Register} />
                        
                        <Scene key="resetpassword" onLeft={() => console.log('hger')} renderLeftButton={this.AppLogo()} component={ResetPassword} />

                    </Scene>


                </Scene>

            </Router>

        );
    }
}

const styles = {
    navigationBarTitleImageStyle: {
        width: 150,
        height: 40,
        flex: 1,
        alignSelf: 'center'
    },

    commonNavigationBarStyle: {
        elevation: 0,
        borderBottomWidth: 0.8,
        borderBottomColor: '#C4C4C4'
    },

    titleStyle: {
        textAlign: 'center',
        fontWeight: 'normal',
        marginLeft: -15,
        flex: 1,
        color: SITE_COLOR
    }

}

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps, { })(RouterComponent);
