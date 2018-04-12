import React from 'react';
import { Modal, View, Button, StyleSheet, Text, Image, Dimensions, TextInput, ScrollView, Picker, Alert } from 'react-native';

import RadioButton from 'radio-button-react-native';
import ButtonC from './ButtonC';
var { width, height } = Dimensions.get('window');
export default class SkipAlert extends React.Component {
    state = {
        task: this.props.task,
        modalVisible: false,
        value: 0,
    }
    openModal() {
        this.setState({ modalVisible: true });
    }

    closeModal() {
        this.setState({ modalVisible: false }, () => { this.props.tasknum(2) })


    }

    handleOnPress(value) {
        this.setState({ value: value })
    }
    handleOnPress(value) {
        this.setState({ value: value })
    }
    render() {
        handleSkip = () => {
            this.openModal();
        }
        return (
            <View>
                {
                    this.state.modalVisible ?

                        <Modal

                            animationType={'slide'}
                            onRequestClose={() => this.closeModal()}

                        >
                            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'grey' }}>
                                <View style={{ paddingHorizontal: 50, width: width - 30, height: width - 30, marginLeft: 15, backgroundColor: 'white', paddingTop: 30 }}>
                                    <Text>Reasons for your skip</Text>
                                    <View style={{ marginTop: 30 }}>
                                        <RadioButton currentValue={this.state.value} innerCircleColor={'blue'} outerCircleColor={'blue'} value={0} onPress={this.handleOnPress.bind(this)} >
                                            <Text style={{ marginLeft: 20, color: 'black', fontSize: 15 }}>i will do it later</Text>
                                        </RadioButton>
                                    </View>
                                    <View style={{ marginTop: 30 }}>
                                        <RadioButton currentValue={this.state.value} innerCircleColor={'blue'} outerCircleColor={'blue'} value={1} onPress={this.handleOnPress.bind(this)} >
                                            <Text style={{ marginLeft: 20, color: 'black', fontSize: 15 }}>I don't want to do this</Text>
                                        </RadioButton>
                                    </View>
                                    <View style={{ marginTop: 30 }}>
                                        <ButtonC
                                            onclick={() => this.closeModal()}
                                            title="Close"
                                        >
                                        </ButtonC>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        : <View></View>
                }
            </View>
        )
    }
}