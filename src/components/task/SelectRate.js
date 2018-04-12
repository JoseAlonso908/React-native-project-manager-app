import React from 'react';
import { Modal, View, Button, StyleSheet, Text, Image, Dimensions, TextInput, ScrollView, Picker, Alert } from 'react-native';
import { Item } from 'native-base';
import CheckBox from 'react-native-checkbox';
import ButtonC from '../ButtonC';
var { width, height } = Dimensions.get('window');
import PropTypes from "prop-types";
import Server from '../../provider/Server';
import RadioButton from 'radio-button-react-native';

export default class SelectRate extends React.Component {
    state = {
        poor: false,
        Average: false,
        Excellent: false,
        Outstanding: false,
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
                            <View style={{ justifyContent: 'space-between', flexDirection: 'column', flex: 1, alignItems: 'flex-start', padding: 10 }}>
                                <Text style={{ color: 'black', fontSize: 15 }}>
                                    {this.state.description}
                                </Text>
                                <View style={{ paddingTop: 20 }}>
                                    <CheckBox
                                        label={JSON.parse(this.state.task.definitionJSON).option1}
                                        checked={this.state.poor}
                                        onChange={(checked) => this.setState({ poor: !checked })}
                                    />
                                </View>
                                <View style={{ paddingTop: 20 }}>
                                    <CheckBox
                                        label={JSON.parse(this.state.task.definitionJSON).option2}
                                        checked={this.state.Average}
                                        onChange={(checked) => this.setState({ Average: !checked })}
                                    />
                                </View>
                                <View style={{ paddingTop: 20 }}>
                                    <CheckBox
                                        label={JSON.parse(this.state.task.definitionJSON).option3}
                                        checked={this.state.Excellent}
                                        onChange={(checked) => this.setState({ Excellent: !checked })}
                                    />
                                </View>
                                <View style={{ paddingTop: 20 }}>
                                    <CheckBox
                                        label={JSON.parse(this.state.task.definitionJSON).option4}
                                        checked={this.state.Outstanding}
                                        onChange={(checked) => this.setState({ Outstanding: !checked })}
                                    />
                                </View>
                            </View></View>
                    </ScrollView>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                        <View style={{ width: width / 2.3 }}>
                            <ButtonC title="SKIP" onclick={handleSkip} />
                        </View>
                        <View style={{ width: width / 2.3 }}>
                            <ButtonC title={'SUBMIT'} onclick={this.handleSubmit} />
                        </View>
                    </View>
                </View>
            </View>
        )

    }

    handleSubmit = () => {

        if (!this.state.poor && !this.state.Average && !this.state.Excellent && !this.state.Outstanding) {
            alert('Please select items');

            return;
        }

        var tempjson = JSON.parse(this.state.task.definitionJSON)
        tempjson.taskDefinition="";
        console.log(tempjson.taskDefinition)
        if (this.state.poor){
            if(tempjson.taskDefinition==""){
                tempjson.taskDefinition = "" + tempjson.option1;
            }else{
            tempjson.taskDefinition = "" +tempjson.taskDefinition+","+ tempjson.option1;
            }
        }
        if (this.state.Average){
            if(tempjson.taskDefinition==""){
                tempjson.taskDefinition = "" + tempjson.option2;
            }else{
            tempjson.taskDefinition = "" +tempjson.taskDefinition+","+ tempjson.option2;
            }
        }
        if (this.state.Excellent){
            if(tempjson.taskDefinition==""){
                tempjson.taskDefinition = "" + tempjson.option3;
            }else{
            tempjson.taskDefinition = "" +tempjson.taskDefinition+","+ tempjson.option3;
            }
        }
        if (this.state.Outstanding){
            if(tempjson.taskDefinition==""){
                tempjson.taskDefinition = "" + tempjson.option4;
            }else{
            tempjson.taskDefinition = "" +tempjson.taskDefinition+","+ tempjson.option4;
            }
        }

         console.log(tempjson)
        this.state.task.definitionJSON = JSON.stringify(tempjson)
        
        this.state.api.postRequest('/task/submit-task', { taskExecutionId: this.state.task.taskExecutionId, entryJSONList: this.state.task.definitionJSON }).then(res => {
            // this.setState({ detail: res.name })
            // console.log(res);
            //alert('Thanks for completing\n\nplease click the below link to submit the survey on your experience of taking the task. The survey will take max of 10 minutes.')

            this.props.tasknum(2);
        }).catch((err) => {
			
        })



    }


}
SelectRate.propTypes = {
    tasknum: PropTypes.func,
};
const styles = StyleSheet.create({
    container: {
        padding: 10,


    }

})

