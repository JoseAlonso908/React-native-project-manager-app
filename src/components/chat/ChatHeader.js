import React from 'react';
import { View, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';


class ChatHeader extends React.Component {
    render() {
        return (
            <View style={{ backgroundColor: '#5ac8fa' }}>
                <View style={styles.topstyle}>
                    <View style={styles.logostyle}>
                        <View style={styles.logoback}></View>
                        <Image style={styles.logoimage} source={require('../../assets/images/mobE.png')} />
                    
                    </View>
                    <Icon style={{ justifyContent: 'flex-end' }} name='clear' color='black' size={35} />
                </View>
                <Text style={styles.textStyle}>
                    In Case of any queries please call us at +91-99999 99999
                </Text>
            </View>
        );
    }
};

const styles = {
    textStyle: {
        fontSize: 22,
        margin: 10,
        color: '#000',
        textAlign: 'center',
    },
    topstyle: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: 10
    },
    logostyle: {
        width: 50,
        height: 50,       
        flex: 0,       
        alignItems: 'center',
        justifyContent:'center'


    },
    logoback: {
        width: 50,
        height: 50,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 25,
        position:'absolute',


    },
    logoimage: {
        width: 30,
        height: 20,
        
    

    }
};

export default ChatHeader;