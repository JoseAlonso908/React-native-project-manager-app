import React from 'react';
import { WebView, Modal, ActivityIndicator, View, Button, StyleSheet, Text, Image, Dimensions, TextInput, ScrollView, Picker, Alert } from 'react-native';
import { Item } from 'native-base';
import ImagePicker from 'react-native-image-picker';
// import MediaPicker from "react-native-mediapicker"
import PropTypes from "prop-types";
var { width, height } = Dimensions.get('window');
import Server from '../../provider/Server';
import RadioButton from 'radio-button-react-native';
import ButtonC from '../ButtonC';


export default class VideoTask extends React.Component {
	state = {
		api: new Server(),
		task: this.props.task,
		videouploaded: false,
		source: { uri: null },

		loadingState: false,
		modalVisible: false,
		value: 0,
		expText:'',
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

				<View style={styles.container}>

					<View style={{ backgroundColor: 'red', height: 30, justifyContent: 'center', alignItems: 'center' }}>
						<Text style={{ color: 'white' }}>
							Complete before {this.state.task.validTill.substring(0, 5)}
						</Text>
					</View>
					{this.state.loadingState ? <ActivityIndicator visible={this.state.loadingState} size="large" color="#0000ff" /> : null}
			

					<ScrollView style={{ padding: 10 }}>



						<Text style={{ color: 'black', fontSize: 15 }}>
							{this.state.task.title}
						</Text>

						<Text style={{ color: 'black', fontSize: 13, marginTop: 10 }}>{this.state.description}</Text>


						<View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 50 }}>
							<Item onPress={this.selectPhotoTapped.bind(this)}>
								<Image style={{ width: width / 3, height: width / 3, }} source={require('../../assets/images/video.png')} />
							</Item>
							{this.state.videouploaded ? <WebView source={this.state.source} /> : null}

						</View>

						<TextInput
							style={{ fontSize: 12, marginTop: 30 }}
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
		if (!this.state.videouploaded) {
			alert('Please upload your file');
			return;
		}

		this.setState({ loadingState: true })

		console.log(this.state.task.definitionJSON);
		this.state.api.mediaHandle(this.state.source.uri, 'videos/', '.mp4', 'video/mp4').then(res => {
			var tempJSON = JSON.parse(this.state.task.definitionJSON);
			tempJSON.taskDefinition = res;
			Object.assign(tempJSON, {"userComment": this.state.expText })
			this.state.task.definitionJSON = JSON.stringify(tempJSON);
			console.log(this.state.task.definitionJSON);
			console.log(this.state.task.expText);

			this.state.api.postRequest('/task/submit-task', { taskExecutionId: this.state.task.taskExecutionId, entryJSONList: this.state.task.definitionJSON }).then(response => {
				this.setState({ loadingState: false })
				// this.setState({ detail: res.name })
				// console.log(res);
				//alert('Thanks for completing\n\nplease click the below link to submit the survey on your experience of taking the task. The survey will take max of 10 minutes.')
				this.props.tasknum(2);
			}).catch((err) => {
			
			})

		}).catch(err=>{

		})
	}

	whenClicked(items) {
		console.log(items);
	}

	selectPhotoTapped() {


		const options = {
			takePhotoButtonTitle: 'Capture Video',
			quality: 1.0,
			maxWidth: 500,
			maxHeight: 500,
			multiple: true,
			mediaType: 'video',
			storageOptions: {
				skipBackup: true
			}
		};

		ImagePicker.showImagePicker(options, (response) => {
			console.log('Response = ', response);

			if (response.didCancel) {
				console.log('User cancelled photo picker');
			}
			else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			}
			else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			}
			else {
				let source = { uri: response.uri };

				// You can also display the image using data:
				// let source = { uri: 'data:image/jpeg;base64,' + response.data };
				var tempJSON = JSON.parse(this.state.task.definitionJSON);
				tempJSON.taskDefinition = response.uri
				this.state.task.definitionJSON = JSON.stringify(tempJSON)

				this.setState({
					videouploaded: true,

					source: source

				});
			}
		});
	}

}
VideoTask.propTypes = {
	tasknum: PropTypes.func,
};
const styles = StyleSheet.create({

	container: {

		height: height / 1.9
	}




})

