
import React from 'react';
import { KeyboardAvoidingView, AsyncStorage, Alert, View, Button, StyleSheet, Text, Image, Dimensions, ScrollView, TextInput } from 'react-native';
import I18n, { getLanguages } from 'react-native-i18n';
import { NavigationActions } from 'react-navigation';

import ButtonC from '../components/ButtonC';
import Server from '../provider/Server';
import DeviceInfo from 'react-native-device-info';
var { width, height } = Dimensions.get('window')

// Enable fallbacks if you want `en-US`and `en-GB` to fallback to `en`
I18n.fallbacks = true;

// Available languages
I18n.translations = {
    'en': require('../assets/locales/en.json'),
};


export default class RegisterScreen extends React.Component {
    state = {
        mobile: '',

        text: '',
        api: new Server(),
    }
    render() {


        const { navigate } = this.props.navigation;


        handleNav = () => {
            if (this.state.text == '') {
                alert("Please enter OTP");
                return;
            }
            this.validateOTP();
        }
        handleResendOTP = () => {
            AsyncStorage.getItem('mobile', (err, mobile) => {
                this.setState({ mobile })
                console.log(mobile);
                this.state.api.postRequest('/participant/participant-login', { mobile: mobile }).then(response => {
                    if (response.sessionId == null) {
                        alert('There is some internal error. Please contact support.')
                        return;
                    }
                    alert('OTP has been resent. Please check your message.');
                }).catch((err) => {
			
                })
    
            })


        }






        return (
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <ScrollView style={{ backgroundColor: '#fff' }}>

                    <View style={styles.container}>
                        <Image style={styles.imagestyle} source={require('../assets/images/mobE.png')} />
                        <View style={styles.textboxStyle}>
                            <View style={styles.textboxStyle}>
                                <Text style={styles.textStyle}>We have sent you on One Time Password(OTP) to your mobile.</Text>
                            </View>
                            <View style={styles.loginFormStyle}>

                                <Text style={styles.labelStyle}>Please enter your OTP</Text>


                                <TextInput style={styles.inputStyle} keyboardType='numeric' onChangeText={(text) => this.setState({ text: text })} />

                                <Text style={styles.resendStyle} onPress={handleResendOTP}>
                                    Resend OTP
                    </Text>
                                <View style={styles.buttonStyle}>
                                    <ButtonC title="LET'S GO" onclick={handleNav} />
                                </View>
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </ KeyboardAvoidingView >
        );
    }
    validateOTP() {
        var { params } = this.props.navigation.state;
        console.log({ sessionId: params.sessionID, mobile: params.mobile, otp: this.state.text });
        this.state.api.postRequest('/participant/validate-o-t-p', { sessionId: params.sessionID, mobile: params.mobile, otp: this.state.text }).then(response => {
            
            if (response.otpPassed) {
                console.log({ mobile: params.mobile, deviceId: DeviceInfo.getUniqueID() });
                this.state.api.postRequest('/participant/update-device-id', { mobile: params.mobile, deviceId: DeviceInfo.getUniqueID() }).then(response1 => {
                    this.goToProfile();
                }).catch((err) => {
			
                })
    
            } else alert('OTP is not correct. Please enter correctly.')
        }).catch((err) => {
			
        })

    }
    goToProfile() {
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Profile' })
            ],

        }))
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    resendStyle: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: 'blue'
    },
    imagestyle: {
        width: 120,
        height: 75,

    },
    textboxStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    loginFormStyle: {
        marginTop: 30,
        width: width / 2
    },
    labelStyle: {
        fontSize: 18,
    },
    inputStyle: {
        fontSize: 18,
        height: 40,
        paddingLeft: 0,
        borderRadius: 0,
        color: 'black',
        borderBottomWidth: 1,


    },
    buttonStyle: {
        marginTop: 10,
        width: width / 2

    }
});


