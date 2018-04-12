import React from 'react';
import { View, Button, StyleSheet, Text, Image, Dimensions, TextInput, ScrollView, Picker, Alert } from 'react-native';
import PropTypes from "prop-types";
import { Item } from 'native-base';


var { width, height } = Dimensions.get('window');

export default class ButtonC extends React.Component {
    render() {
        return (
            <View>

                <Item style={{ backgroundColor: '#0073ff',  height: 40, borderRadius: 5, justifyContent: 'center' }} onPress={this.props.onclick}>
                    <Text style={{ color: 'white' }}>{this.props.title}</Text>
                </Item>
            </View>
        )
    }

}
ButtonC.propTypes = {
    title:PropTypes.string,
    onclick: PropTypes.func,
};
  
