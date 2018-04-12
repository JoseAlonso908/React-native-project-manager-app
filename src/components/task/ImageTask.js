import React from 'react';
import { ActivityIndicator, Modal, View, Button, StyleSheet, Text, Image, Dimensions, TextInput, ScrollView, Picker, Alert } from 'react-native';
import PropTypes from "prop-types";
import { Item } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import ButtonC from '../ButtonC';
import Server from '../../provider/Server';
import RadioButton from 'radio-button-react-native';

var { width, height } = Dimensions.get('window');

export default class ImageTask extends React.Component {

	state = {
		imageuploaded: false,
		api: new Server(),
		task: this.props.task,
		ImageSourceArray: require('../../assets/images/addphoto.png'),
		uploadImageSourceArray: [],
		modalVisible: false,
		value: 0,
		noOfFiles: parseInt(JSON.parse(this.props.task.definitionJSON).noOfFiles, 10),
		index: parseInt(JSON.parse(this.props.task.definitionJSON).noOfFiles, 10),
		expText: '',
		loadingState: false,

		description: JSON.parse(this.props.task.definitionJSON).taskDefinition

	}
	componentWillMount() {
		this.initImageArray()



	}
	initImageArray() {
		let ImageSourceArray = []
		// ImageSourceArray.push('https://firebasestorage.googleapis.com/v0/b/mobe-68275.appspot.com/o/addphoto.png?alt=media&token=452bd6fc-22b9-4dd1-94b1-b68856b220ee')
		for (let index = 0; index < this.state.noOfFiles; index++) {
			ImageSourceArray.push('https://firebasestorage.googleapis.com/v0/b/mobe-68275.appspot.com/o/addphoto.png?alt=media&token=452bd6fc-22b9-4dd1-94b1-b68856b220ee')
		}
		this.setState({ ImageSourceArray })
		console.log("array", ImageSourceArray)


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
				<View style={{ backgroundColor: 'red', height: 30, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ color: 'white' }}>
						Complete before {this.state.task.validTill.substring(0, 5)}
					</Text>
				</View>

				{this.state.loadingState ? <ActivityIndicator visible={this.state.loadingState} size="large" color="#0000ff" /> : null}

				<View style={styles.container}>
					<ScrollView >


						<Text style={{ color: 'black', fontSize: 13, marginTop: 10 }}>
							{this.state.description}
						</Text>
						<Text style={{ color: 'black', fontSize: 13, marginTop: 10 }}>
							You uploaded {this.state.noOfFiles - this.state.index} files
						</Text>

						<ScrollView style={{ flexDirection: 'row', padding: 5, }} horizontal>

							<Item onPress={this.selectPhotoTapped.bind(this)}>
								<Image style={{ width: width / 2 - 20, height: width / 2 - 20 }} source={require('../../assets/images/addphoto.png')} />
							</Item>

							{
								this.state.ImageSourceArray.map((slot, index) => {
									return <Image key={"" + index} style={{ width: width / 2 - 20, height: width / 2 - 20, marginLeft: 10 }} source={{ uri: slot }} />

								})
							}


						</ScrollView>

						<TextInput
							style={{ fontSize: 12, marginTop: 50 }}
							editable={true}
							multiline={true}
							placeholder={'Say some about your experience'}
							onChangeText={(expText) => this.setState({ expText })}
							value={this.state.expText}
						/>

						<View style={{ borderWidth: 0.4, borderColor: '#09998c', marginTop: 50 }}></View>

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
		
		if (this.state.imageuploaded) {
			this.setState({ loadingState: true })


			var tempJSON = JSON.parse(this.state.task.definitionJSON);
			tempJSON.taskDefinition = JSON.stringify({ "ImageSourceArray": this.state.uploadImageSourceArray });
			Object.assign(tempJSON, { "userComment": this.state.expText })
			this.state.task.definitionJSON = JSON.stringify(tempJSON);
			console.log(this.state.task.definitionJSON)

			this.state.api.postRequest('/task/submit-task', { taskExecutionId: this.state.task.taskExecutionId, entryJSONList: this.state.task.definitionJSON }).then(response => {

				this.setState({
					imageuploaded: false,
					ImageSourceArray: [],
					uploadImageSourceArray: [],
					value: 0,
					expText: '',
					loadingState: false,					
					index: parseInt(JSON.parse(this.props.task.definitionJSON).noOfFiles, 10),
					task: this.props.task,

				})
				this.initImageArray();

				this.props.tasknum(2);

			}).catch(err=>{
      
			})

		} else {
			Alert.alert('Please upload your file')

		}
	}
	selectPhotoTapped() {
		if (this.state.index == 0) return
		const options = {
			quality: 1.0,
			maxWidth: 500,
			maxHeight: 500,
			multiple: true,
			storageOptions: {
				skipBackup: true
			}
		};
		this.setState({ loadingState: true })
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

				// You can also display the image using data:
				// let source = {uri: 'data:image/jpeg;base64,' + response.data };
				
				this.state.api.mediaHandle(response.uri, 'images/', '.jpg', "image/jpeg").then(res => {
					this.setState({ loadingState: false })
					this.state.ImageSourceArray[this.state.noOfFiles - this.state.index] = response.uri
					this.state.uploadImageSourceArray[this.state.noOfFiles - this.state.index] = res;
					this.setState({
						index: this.state.index - 1
					});
					if (this.state.index == 0)
						this.setState({
							imageuploaded: true,

						});
					else {
						alert('Successfully uploaded file ' + (this.state.noOfFiles - this.state.index) + '\nplease upload other file')
					}



				}).catch((err) => {
					// alert('no network!', err)
					this.setState({ loadingState: false })
					console.log(err);
				})



			}
		});
	}



	// selectPhotoTapped() {
	// 	const options = {
	// 		quality: 1.0,
	// 		maxWidth: 500,
	// 		maxHeight: 500,
	// 		multiple: true,
	// 		storageOptions: {
	// 			skipBackup: true
	// 		}
	// 	};

	// 	ImagePicker.showImagePicker(options, (response) => {
	// 		console.log('Response = ', response);

	// 		if (response.didCancel) {
	// 			console.log('User cancelled photo picker');
	// 		}
	// 		else if (response.error) {
	// 			console.log('ImagePicker Error: ', response.error);
	// 		}
	// 		else if (response.customButton) {
	// 			console.log('User tapped custom button: ', response.customButton);
	// 		}
	// 		else {

	// 			// You can also display the image using data:
	// 			// let source = {uri: 'data:image/jpeg;base64,' + response.data };

	// 			this.state.ImageSourceArray[this.state.noOfFiles - this.state.index] = response.uri
	// 			console.log(this.state.ImageSourceArray)
	// 			this.setState({
	// 				imageuploaded: true,
	// 			});
	// 		}
	// 	});
	// }
}

ImageTask.propTypes = {
	tasknum: PropTypes.func,
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		height: height / 1.9
	}

})
