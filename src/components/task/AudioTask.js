import React from 'react';
import { WebView, Modal, View, Button, StyleSheet, Text, Image, Dimensions, TextInput, ScrollView, Picker, Alert, TouchableOpacity } from 'react-native';
import { Item } from 'native-base';
import PropTypes from "prop-types";
import Server from '../../provider/Server';
import ButtonC from '../ButtonC';
import RadioButton from 'radio-button-react-native';
import { Icon } from 'react-native-elements';

import { AudioRecorder, AudioUtils } from 'react-native-audio';
import { NativeModules } from 'react-native'

const FilePicker = NativeModules.FileChooser
var { width, height } = Dimensions.get('window');

export default class AudioTask extends React.Component {
	state = {
		api: new Server(),
		task: this.props.task,
		uploaded: false,
		modalVisible: false,
		value: 0,
		source: { uri: null },
		onRecord: false,
		pauseRecord: false,
		expText: '',
		description: JSON.parse(this.props.task.definitionJSON).taskDefinition
	}
	audioPath = AudioUtils.DocumentDirectoryPath + '/recoded.aac';
	componentDidMount() {


		AudioRecorder.prepareRecordingAtPath(this.audioPath, {
			SampleRate: 22050,
			Channels: 1,
			AudioQuality: "Low",
			AudioEncoding: "aac"
		});

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
			<ScrollView>
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
				{
					this.state.onRecord ?

						<Modal

							animationType={'slide'}
							onRequestClose={() => this.pauseRecord()}

						>
							<View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'grey' }}>
								<View style={{ paddingHorizontal: 50, width: width - 30, height: width - 30, marginLeft: 15, backgroundColor: 'white', paddingTop: 30 }}>
									{this.state.pauseRecord ? <Text>Recording pauseed</Text> : <Text>Recording now...</Text>}

									<View style={{ marginTop: 80, justifyContent: 'space-between', flex: 0, flexDirection: 'row' }}>
										{this.state.pauseRecord ?
											<TouchableOpacity onPress={() => this.resumeRecord()}>
												<Icon style={{ justifyContent: 'flex-end' }} name='check' color='black' size={35} />
											</TouchableOpacity> :
											<TouchableOpacity onPress={() => this.pauseRecord()}>
												<Icon style={{ justifyContent: 'flex-end' }} name='pause' color='black' size={35} />
											</TouchableOpacity>
										}

										<TouchableOpacity onPress={() => this.stopRecord()}>
											<Icon style={{ justifyContent: 'flex-end' }} name='stop' color='black' size={35} />
										</TouchableOpacity>
									</View>
								</View>
							</View>
						</Modal>
						: <View></View>
				}

				<View style={styles.container}>
					<View style={{ backgroundColor: 'red', height: 30, justifyContent: 'center', alignItems: 'center' }}>
						<Text style={{ color: 'white' }}>
							Complete before {this.state.task.validTill.substring(0, 5)}
						</Text>
					</View>
					<ScrollView style={{ padding: 10 }}>


						<Text style={{ color: 'black', fontSize: 15 }}>
							{this.state.description}
						</Text>

						<View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 50, paddingHorizontal: 25 }}>
							{!this.state.uploaded ? <Item onPress={this.selectRecordTapped.bind(this)}>
								<Image style={{ width: width / 3, height: width / 3 }} source={require('../../assets/images/voicerecord.png')} />
							</Item> : null}

							{!this.state.uploaded ?
								<Item onPress={this.selectPickerTapped.bind(this)}>
									<Image style={{ width: width / 3, height: width / 3 }} source={require('../../assets/images/addaudio.png')} />
								</Item> : null}

							{this.state.uploaded ? <WebView style={{ width: width / 3, height: width / 3, marginLeft: width / 3 - 25 }} source={this.state.source} /> : null}
						</View>



						<TextInput
							style={{ fontSize: 12, marginTop: 50 }}
							editable={true}
							multiline={true}
							placeholder={'Say some about your experience'}
							onChangeText={(expText) => this.setState({ expText })}
							value={this.state.expText}
						/>

						<View style={{ borderWidth: 0.4, borderColor: '#09998c', marginTop: 10 }}></View>

					</ScrollView>
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
					<View style={{ width: width / 2.3 }}>
						<ButtonC title="SKIP" onclick={handleSkip} />
					</View>
					<View style={{ width: width / 2.3 }}>
						<ButtonC title="SUBMIT" onclick={this.handleSubmit} />
					</View>
				</View>


			</ScrollView>

		)
	}

	handleSubmit = () => {

		if (!this.state.uploaded) {
			alert('Please upload your file');

			return;
		}
		
		console.log(this.state.task.definitionJSON);

		this.state.api.postRequest('/task/submit-task', { taskExecutionId: this.state.task.taskExecutionId, entryJSONList: this.state.task.definitionJSON }).then(res => {
			// this.setState({ detail: res.name })
			// console.log(res);
			//alert('Thanks for completing\n\nplease click the below link to submit the survey on your experience of taking the task. The survey will take max of 10 minutes.')

			this.props.tasknum(2);
		}).catch(err=>{
      
		})

	}

	selectRecordTapped() {


		AudioRecorder.startRecording();
		this.setState({ onRecord: true });


	}

	selectPickerTapped() {
		FilePicker.show(
			{
				title: 'Audio Picker',
				mimeType: 'audio/*',
			},
			(response) => {
				console.log('Response = ', response);

				if (response.didCancel) {
					console.log('User cancelled file chooser');
				} else {
					let source = { uri: response.uri };
					this.saveUrl(source)

				}

			});

	}
	pauseRecord() {

		AudioRecorder.pauseRecording()
		this.setState({ pauseRecord: true });

		// You can also display the image using data:
		// let source = { uri: 'data:image/jpeg;base64,' + response.data };
	}
	resumeRecord() {

		AudioRecorder.resumeRecording()
		this.setState({ pauseRecord: false });

		// You can also display the image using data:
		// let source = { uri: 'data:image/jpeg;base64,' + response.data };
	}
	stopRecord() {
		alert("recorded successfuly")
		AudioRecorder.stopRecording();
		let source = { uri: 'file://' + this.audioPath };
		this.saveUrl(source)


	}

	saveUrl(source) {

		this.setState({
			uploaded: true,

			source: source,
			onRecord: false

		});

		this.state.api.mediaHandle(source.uri, 'record/', '.aac', 'audio/vnd.dlna.adts').then((res) => {
			var tempJSON = JSON.parse(this.state.task.definitionJSON);
			tempJSON.taskDefinition = res;
			
			Object.assign(tempJSON, {"userComment": this.state.expText })
			this.state.task.definitionJSON = JSON.stringify(tempJSON)


		}).catch(err=>{
      
		})

	}



}
AudioTask.propTypes = {
	tasknum: PropTypes.func,
};
const styles = StyleSheet.create({
	container: {
		height: height / 1.9


	}

})

