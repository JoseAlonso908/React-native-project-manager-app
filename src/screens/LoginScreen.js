
import React from 'react';
import { KeyboardAvoidingView, AsyncStorage, View, StyleSheet, Text, Image, Alert, TextInput, Dimensions, ScrollView } from 'react-native';
import I18n, { getLanguages } from 'react-native-i18n';
import { Item } from 'native-base';

import ButtonC from '../components/ButtonC';
import Server from './../provider/Server';

var { width, height } = Dimensions.get('window')
import { NavigationActions } from 'react-navigation';


// Enable fallbacks if you want `en-US`and `en-GB` to fallback to `en`
I18n.fallbacks = true;

// Available languages
I18n.translations = {
    'en': require('../assets/locales/en.json'),
};


export default class LoginScreen extends React.Component {



    static navigationOptions = {
        header: null
    };

    state = {
        nextEnable: false,
        text: '',
        api: new Server()
    }


    handleNav = () => {
        const { navigate } = this.props.navigation;

        if (this.state.text == '') {
            alert('Mobile number cant be empty.')
            return
        }
        this.state.api.postRequest('/participant/participant-login', { mobile: this.state.text }).then(response => {
            if (response.sessionId == null) {
                alert('Your mobile no yet registered with us. Please try again once you recieve invitation from our team.')
                return;
            }
            AsyncStorage.setItem('mobile', this.state.text, () => {
                navigate('Register', { sessionID: response.sessionId, mobile: this.state.text });
            })
        }).catch((err) => {
			
        })
// Successfully logged in 
    }
    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <ScrollView style={{ backgroundColor: '#fff' }}>
                    <View style={styles.container}>

                        <Image style={styles.imagestyle} source={require('../assets/images/mobE.png')} />
                        <View style={styles.textboxStyle}>
                            <Text style={styles.textStyle}>{I18n.t('Thanks for participating')}</Text>
                            <Text style={styles.textStyle}>Let's login quickly and get started</Text>
                            <View style={styles.loginFormStyle}>
                                <Text style={styles.labelStyle}>Enter your 10 digit mobile number</Text>
                                <TextInput style={styles.inputStyle} keyboardType='numeric' onChangeText={(text) => this.setState({ text })} underlineColorAndroid='transparent' />
                                <Text></Text>
                                <Text></Text>
                                <ButtonC style={styles.buttonStyle} title="SIGN IN" onclick={this.handleNav} />
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </ KeyboardAvoidingView>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70,
    },
    imagestyle: {
        width: 120,
        height: 75,

    },
    textboxStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    textStyle: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    loginFormStyle: {
        marginTop: 60,
        width: width / 1.5
    },
    labelStyle: {
        fontSize: 18,
    },
    inputStyle: {
        // backgroundColor: 'rgba(255,255, 255, 0.4)',
        height: 40,
        fontSize: 18,
        // marginHorizontal: 20,
        paddingLeft: 0,
        borderRadius: 0,
        color: 'black',
        borderBottomWidth: 1,
        // placeholder: "+99 999 999",
    },
    buttonStyle: {
        marginTop: 35,
    }
});




