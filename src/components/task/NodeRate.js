import React from 'react';
import { Modal, TouchableOpacity, View, Button, StyleSheet, Text, Image, Dimensions, TextInput, ScrollView, Picker, Alert } from 'react-native';
import { Item } from 'native-base';
import ButtonC from '../ButtonC';
var { width, height } = Dimensions.get('window');
import PropTypes from "prop-types";
import Server from '../../provider/Server';
import RadioButton from 'radio-button-react-native';

export default class NodeRate extends React.Component {
    state = {
        mark: 0,
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
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                                    <Text style={{ color: 'black', fontSize: 15 }}>
                                        Bad
                                    </Text>
                                    <Text style={{ color: 'black', fontSize: 15 }}>
                                        Good
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 2, marginTop: 30, }}>
                                    <TouchableOpacity onPress={() => { this.setState({ mark: 1 }) }}>

                                        <View style={this.stylechanged(0)}  >
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => { this.setState({ mark: 2 }) }}>
                                        <View style={this.stylechanged(1)}  >
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => { this.setState({ mark: 3 }) }}>
                                        <View style={this.stylechanged(2)}>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { this.setState({ mark: 4 }) }}>
                                        <View style={this.stylechanged(3)}>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { this.setState({ mark: 5 }) }}>
                                        <View style={this.stylechanged(4)}>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { this.setState({ mark: 6 }) }}>
                                        <View style={this.stylechanged(5)}>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { this.setState({ mark: 7 }) }}>
                                        <View style={this.stylechanged(6)}>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { this.setState({ mark: 8 }) }}>
                                        <View style={this.stylechanged(7)}>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { this.setState({ mark: 9 }) }}>
                                        <View style={this.stylechanged(8)}>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { this.setState({ mark: 10 }) }}>
                                        <View style={this.stylechanged(9)}>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            </ScrollView>
                        </View>
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
        if (this.state.mark==0) {
			alert('Please select your rate');
		
			return;
		}


        var tempJSON = JSON.parse(this.state.task.definitionJSON);
        tempJSON.taskDefinition = ""+this.state.mark;
        this.state.task.definitionJSON = JSON.stringify(tempJSON)
        console.log(this.state.task.definitionJSON);
        
        //alert('Thanks for completing\n\nplease click the below link to submit the survey on your experience of taking the task. The survey will take max of 10 minutes.')
        this.state.api.postRequest('/task/submit-task', { taskExecutionId: this.state.task.taskExecutionId, entryJSONList: this.state.task.definitionJSON }).then(res => {
            // this.setState({ detail: res.name })
            // console.log(res);
            //alert('Thanks for completing\n\nplease click the below link to submit the survey on your experience of taking the task. The survey will take max of 10 minutes.')

            this.props.tasknum(2);
        }).catch((err) => {
			
        })




    }

    stylechanged(kind) {
        switch (kind) {
            case 0:
                if (this.state.mark >= 1)
                    return {
                        backgroundColor: '#00aeed',
                        width: width / 11,
                        height: width / 12,
                    }
                else return {
                    backgroundColor: '#d8d8d8',
                    width: width / 11,
                    height: width / 12,

                }

            case 1: if (this.state.mark >= 2) return {
                backgroundColor: '#00aeed',
                width: width / 11,
                height: width / 12,
            }
            else return {
                backgroundColor: '#d8d8d8',
                width: width / 11,
                height: width / 12,

            }

            case 2: if (this.state.mark >= 3) return {
                backgroundColor: '#00aeed',
                width: width / 11,
                height: width / 12,
            }
            else return {
                backgroundColor: '#d8d8d8',
                width: width / 11,
                height: width / 12,

            }
            case 3: if (this.state.mark >= 4) return {
                backgroundColor: '#00aeed',
                width: width / 11,
                height: width / 12,
            }
            else return {
                backgroundColor: '#d8d8d8',
                width: width / 11,
                height: width / 12,

            }
            case 4: if (this.state.mark >= 5) return {
                backgroundColor: '#00aeed',
                width: width / 11,
                height: width / 12,
            }
            else return {
                backgroundColor: '#d8d8d8',
                width: width / 11,
                height: width / 12,

            }
            case 5: if (this.state.mark >= 6) return {
                backgroundColor: '#00aeed',
                width: width / 11,
                height: width / 12,
            }
            else return {
                backgroundColor: '#d8d8d8',
                width: width / 11,
                height: width / 12,

            }
            case 6: if (this.state.mark >= 7) return {
                backgroundColor: '#00aeed',
                width: width / 11,
                height: width / 12,
            }
            else return {
                backgroundColor: '#d8d8d8',
                width: width / 11,
                height: width / 12,

            }
            case 7: if (this.state.mark >= 8) return {
                backgroundColor: '#00aeed',
                width: width / 11,
                height: width / 12,
            }
            else return {
                backgroundColor: '#d8d8d8',
                width: width / 11,
                height: width / 12,

            }
            case 8: if (this.state.mark >= 9) return {
                backgroundColor: '#00aeed',
                width: width / 11,
                height: width / 12,
            }
            else return {
                backgroundColor: '#d8d8d8',
                width: width / 11,
                height: width / 12,

            }
            case 9: if (this.state.mark >= 10) return {
                backgroundColor: '#00aeed',
                width: width / 11,
                height: width / 12,
            }
            else return {
                backgroundColor: '#d8d8d8',
                width: width / 11,
                height: width / 12,

            }
        }

    }
}
NodeRate.propTypes = {
    tasknum: PropTypes.func,
};
const styles = StyleSheet.create({
    container: {
        padding: 10,


    },
    selected: {
        padding: 10


    }

})



