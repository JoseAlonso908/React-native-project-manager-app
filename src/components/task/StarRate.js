import React from 'react';
import { Modal, View, Button, StyleSheet, Text, Image, Dimensions, TextInput, ScrollView, Picker, Alert, AsyncStorage } from 'react-native';
import { Item } from 'native-base';
import { Rating } from 'react-native-elements';
import ButtonC from '../ButtonC';
import Server from '../../provider/Server';
var { width, height } = Dimensions.get('window');
import PropTypes from "prop-types";
import RadioButton from 'radio-button-react-native';
export default class StarRate extends React.Component {

    state = {
        marked: false,
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
   
    ratingCompleted(rating) {
        console.log("Rating is: " + rating)
        this.setState({ marked: true })

        
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
                                <Rating
                                    type="star"
                                    ratingCount={5}
                                    fractions={2}
                                    startingValue={3.5}
                                    imageSize={40}
                                    onFinishRating={this.ratingCompleted.bind(this)}
                                    style={{ paddingHorizontal: 10, justifyContent: 'space-between', flex: 1, alignItems: 'center', marginTop: 50 }}
                                    ratingBackgroundColor='rgba(0,0,0,0)'

                                />
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

        if (!this.state.marked) {
            alert('Please select your rate');

            return;
        }


        var tempjson = JSON.parse(this.state.task.definitionJSON)
        tempjson.taskDefinition = "" + this.state.value;
        console.log(tempjson.taskDefinition)
        this.state.task.definitionJSON = JSON.stringify(tempjson)


        console.log(this.state.task.taskExecutionId, this.state.task.definitionJSON)
        this.state.api.postRequest('/task/submit-task', { taskExecutionId: this.state.task.taskExecutionId, entryJSONList: this.state.task.definitionJSON }).then(res => {
            // this.setState({ detail: res.name })
            // console.log(res);
           // alert('Thanks for completing\n\nplease click the below link to submit the survey on your experience of taking the task. The survey will take max of 10 minutes.')

            this.props.tasknum(2);
        }).catch((err) => {
			
        })




    }



}
StarRate.propTypes = {
    tasknum: PropTypes.func,

};
const styles = StyleSheet.create({
    container: {
        padding: 10,


    }

})

