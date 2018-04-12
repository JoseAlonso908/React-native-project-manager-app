import React from 'react';
import { Modal, TouchableOpacity, View, Button, StyleSheet, Text, Image, Dimensions, TextInput, ScrollView, Picker, Alert } from 'react-native';
import { Item } from 'native-base';
import ButtonC from '../ButtonC';
var { width, height } = Dimensions.get('window');
import PropTypes from "prop-types";
import Server from '../../provider/Server';
import RadioButton from 'radio-button-react-native';

export default class EmojiRate extends React.Component {
    state = {
        smile: false,
        flow: false,
        sad: false,
        api: new Server(),
        task: this.props.task,
        modalVisible: false,
        value: 0,

        description: JSON.parse(this.props.task.definitionJSON).taskDefinition
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
                                        <Button
                                            onPress={() => this.closeModal()}
                                            title="Close"
                                        >
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        : <View></View>
                }

                <View style={{ height: height - width / 720 * 303 - 100 }}>
                    <ScrollView >
                        <View style={{ backgroundColor: 'red', height: 30, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white' }}>
                            Complete before {this.state.task.validTill.substring(0, 5)}
					</Text>
                        </View>

                        <View style={styles.container}>
                            <ScrollView>

                                <Text style={{ color: 'black', fontSize: 15 }}>
                                    {this.state.description}
                                 </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 30, marginTop: 30, }}>
                                    <TouchableOpacity onPress={() => { this.setState({ smile: true, flow: false, sad: false }) }}>
                                        <Image style={this.stylechanged(0)} source={require('../../assets/images/smile.png')} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => { this.setState({ smile: false, flow: true, sad: false }) }}>
                                        <Image style={this.stylechanged(1)} source={require('../../assets/images/flow.png')} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => { this.setState({ smile: false, flow: false, sad: true }) }}>
                                        <Image style={this.stylechanged(2)} source={require('../../assets/images/sad.png')} />
                                    </TouchableOpacity>

                                </View>
                            </ScrollView></View>
                    </ScrollView>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                        <View style={{ width: width / 2.3 }}>
                            <ButtonC title="SKIP" onclick={handleSkip} />
                        </View>
                        <View style={{ width: width / 2.3 }}>
                            <ButtonC title={'DONE'} onclick={this.handleSubmit} />
                        </View>
                    </View>
                </View>
            </View>
        )

    }

    handleSubmit = () => {

        var tempJSON = JSON.parse(this.state.task.definitionJSON);
        if (this.state.smile)
            tempJSON.taskDefinition = "smile";
        else if (this.state.flow)
            tempJSON.taskDefinition = "flat";
        else if (this.state.sad)
            tempJSON.taskDefinition = "sad";
        else {
            alert('Please select your emoticon');

            return;
        }



        this.state.task.definitionJSON = JSON.stringify(tempJSON)
        console.log(this.state.task.definitionJSON);
        this.state.api.postRequest('/task/submit-task', { taskExecutionId: this.state.task.taskExecutionId, entryJSONList: this.state.task.definitionJSON }).then(res => {
            // this.setState({ detail: res.name })
            // console.log(res);
            //alert('Thanks for completing\n\nplease click the below link to submit the survey on your experience of taking the task. The survey will take max of 10 minutes.')

            this.props.tasknum(2);
        }).catch(err=>{
      
        })


    }

    stylechanged(kind) {
        switch (kind) {
            case 0:
                if (this.state.smile) {
                    return {
                        borderRadius: width / 12,
                        borderWidth: 4,
                        width: width / 6,
                        height: width / 6,
                        borderColor: 'green',
                        shadowColor: 'red',
                        shadowOffset: {
                            width: 100,
                            height: 100
                        },
                        shadowRadius: 2,
                        shadowOpacity: 1.0,
                    }
                }
                else
                    return
            case 1: if (this.state.flow) {
                return {
                    borderRadius: width / 12,
                    borderWidth: 4,
                    width: width / 6,
                    height: width / 6,
                    borderColor: 'green',
                    shadowColor: 'red',
                    shadowOffset: {
                        width: 100,
                        height: 100
                    },
                    shadowRadius: 2,
                    shadowOpacity: 1.0,
                }
            }
            else
                return
            case 2: if (this.state.sad) {
                return {
                    borderRadius: width / 12,
                    borderWidth: 4,
                    width: width / 6,
                    height: width / 6,
                    borderColor: 'green',
                    shadowColor: 'red',
                    shadowOffset: {
                        width: 100,
                        height: 100
                    },
                    shadowRadius: 2,
                    shadowOpacity: 1.0,
                }
            } else
                return
        }

    }
}
EmojiRate.propTypes = {
    tasknum: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        padding: 10,


    }

})

