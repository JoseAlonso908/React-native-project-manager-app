import React from 'react';
import ButtonC from '../components/ButtonC';
import {
	KeyboardAvoidingView,
	AsyncStorage,
	AppRegistry,
	PixelRatio,
	TouchableOpacity
	, CameraRoll, View, Button, StyleSheet, Text, Image, Dimensions, TextInput, ScrollView, Picker
} from 'react-native';
import { Icon } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import Server from '../provider/Server';
var { width, height } = Dimensions.get('window')

export default class ProfileScreen extends React.Component {
	static navigationOptions = {
		header: null
	};


	state = {
		ImageSource: {},
		IDProofImg: {},
		mobile: '',
		api: new Server(),
		name: null,
		age: null,
		gender: null,
		profession: null,
		prefferedLanguage: null,
		location: null,
		IDProof: null,
	};
	componentWillMount() {
		AsyncStorage.getItem('mobile', (err, mobile) => {
			this.setState({ mobile })
			console.log(mobile)
			this.state.api.getRequest('/participant/get-participant-details?mobile=' + mobile).then(response => {
				this.setState({ IDProof: response.idtype ? response.idtype : '', location: response.locationString ? response.locationString : '', name: response.name ? response.name : '', age: response.age ? response.age : 0, gender: response.gender ? response.gender : '', profession: response.profession ? response.profession : '', prefferedLanguage: response.prefferedLanguage ? response.prefferedLanguage : '', ImageSource: response.profilePhotoURL ? { uri: response.profilePhotoURL } : require('../assets/images/profile.png'), IDProofImg: response.idFileURL ? { uri: response.idFileURL } : {} })
				AsyncStorage.setItem('profile', JSON.stringify(response));
				console.log(JSON.stringify(response.ewalletNumber))
				AsyncStorage.setItem('ewalletNumber', JSON.stringify(response.ewalletNumber));
				AsyncStorage.setItem('session', 'ok');

			}).catch((err) => {
			
			})

		})

	}

	selectPhotoTapped() {

		this.imagePickerFun(0);

	}

	selectIDTapped() {

		this.imagePickerFun(1);

	}

	imagePickerFun(kind) {

		const options = {
			quality: 1.0,
			maxWidth: 500,
			maxHeight: 500,
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


				this.state.api.mediaHandle(response.uri, 'profileImage/', '.jpg', "image/jpeg").then(res => {
					console.log('aws3 url', res);
					let source = { uri: res };
					if (kind == 0)
						this.setState({
							ImageSource: source
						});
					else
						this.setState({
							IDProofImg: source
						})
				}).catch((err) => {
			
				})
	

			}
		});
	}
	render() {
		const { navigate } = this.props.navigation;

		handleNav = () => {
			if (this.state.location == null || this.state.name == null || this.state.gender == null || this.state.age == null || this.state.profession == null || this.state.prefferedLanguage == null || this.state.IDProof == null || this.state.IDProofImg.uri == null || this.state.ImageSource.uri == null) {

				alert('Please enter correct details.');
				return
			}
			reportJSON = { name: this.state.name, gender: this.state.gender, age: this.state.age, mobile: this.state.mobile, profession: this.state.profession, prefferedLanguage: this.state.prefferedLanguage, idtype: this.state.IDProof, idFileURL: this.state.IDProofImg.uri, profilePhotoURL: this.state.ImageSource.uri }
			console.log(reportJSON);
			this.state.api.postRequest('/participant/update-participant-profile', reportJSON).then(response => {
				AsyncStorage.mergeItem('profile', JSON.stringify(reportJSON), () => {
					navigate('Wallets', { name: 'Jane' });
				});

			}).catch((err) => {
			
			})


		}




		return (
			<KeyboardAvoidingView style={{ flex: 1 }}>
				<ScrollView style={{ backgroundColor: '#fff' }}>

					<View style={styles.container}>
						<Text>
							Review Details
						</Text>

						<View style={styles.slideContainer}>
							<View style={styles.slideStyle1}>
							</View>
							<View style={styles.crossStyle}>
							</View>
							<View style={styles.slideStyle2}>
							</View>
						</View>
						<View style={styles.lineStyle}>
						</View>



						{this.state.ImageSource === null ? <Image style={styles.avatar} source={require('../assets/images/oval.png')} /> : <Image style={styles.avatar} source={this.state.ImageSource} />}

						<View style={styles.avatarcontainer}  >
							<TouchableOpacity style={styles.cameracontainer} onPress={this.selectPhotoTapped.bind(this)}>


								<Image style={styles.oval} source={require('../assets/images/oval.png')} />
								<Icon style={styles.camera} name='camera' />

							</TouchableOpacity>

						</View>

					</View>
					<View style={{ padding: 10 }}>
						<Text style={styles.descriptionstyle} >
							Participant Name
						</Text>
						<TextInput
							style={{
								height: 40,
								borderTopColor: '#ffffff',
								borderBottomColor: 'black',
								borderLeftColor: '#ffffff',
								borderRightColor: '#ffffff',
								borderWidth: 1,
								marginBottom: 5,
								margin: 10,
							}}
							placeholder={this.state.name}
							onChangeText={(name) => this.setState({ name })}
						/>

						<View style={{ flexDirection: 'row' }}>
							<View style={{ flexDirection: 'column', width: width / 2 - 10 }}>
								<Text style={styles.descriptionstyle}>
									Age
								</Text>
								<TextInput
									keyboardType='numeric'
									style={styles.underlineStyle}
									placeholder={'' + this.state.age}
									onChangeText={(age) => this.setState({ age: parseInt(age, 10) })}
								/>
							</View>
							<View style={{ flexDirection: 'column', width: width / 2 - 10 }}>
								<Text style={styles.descriptionstyle}>
									Gender
								</Text>
								<TextInput
									style={styles.underlineStyle}
									placeholder={this.state.gender}
									onChangeText={(gender) => this.setState({ gender })}
								/>
							</View>
						</View>

						<Text style={styles.descriptionstyle}>
							Profession
						</Text>
						<TextInput
							style={styles.underlineStyle}
							placeholder={this.state.profession}
							onChangeText={(profession) => this.setState({ profession })}
						/>

						<Text style={styles.descriptionstyle}>
							Prefered Language
						</Text>

						<TextInput
							style={styles.underlineStyle}
							placeholder={this.state.prefferedLanguage}
							onChangeText={(prefferedLanguage) => this.setState({ prefferedLanguage })}
						/>

						<Text style={styles.descriptionstyle}>
							Location
						</Text>
						<Text style={{
							height: 23, borderTopColor: '#ffffff', borderBottomColor: '#B3B3B3',
							borderLeftColor: '#ffffff', borderRightColor: '#ffffff', borderWidth: 1,
							marginTop: 20, marginRight: 10, marginLeft: 10, color: '#B3B3B3'
						}} >{this.state.location}
						</Text>


						<Text style={styles.descriptionstyle}>
							ID Proof
						</Text>
						<TextInput
							style={styles.underlineStyle}
							placeholder={this.state.IDProof}
							onChangeText={(IDProof) => this.setState({ IDProof })}
						/>

					</View>

					<Image style={styles.proof} source={this.state.IDProofImg} />
					<TouchableOpacity onPress={this.selectIDTapped.bind(this)}>
						<Text style={styles.resendStyle} >
							Upload ID Proof
						</Text>
					</TouchableOpacity>

					<View style={styles.container}>

						<View style={styles.buttonStyle}>
							<ButtonC title="THIS IS GOOD" onclick={handleNav} />
						</View>
					</View>



				</ScrollView>
			</ KeyboardAvoidingView>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
	},

	slideStyle1: {
		width: 16,
		height: 16,
		borderRadius: 16,
		backgroundColor: '#007AFF'


	},
	slideStyle2: {
		width: 16,
		height: 16,
		borderRadius: 16,
		backgroundColor: '#B3B3B3'


	},

	crossStyle: {
		borderRadius: 4,
		borderWidth: 2,
		borderColor: '#D8D8D8',
		width: 64,
		height: 5,
		marginTop: 5,


	},
	slideContainer: {
		flexDirection: 'row',
		height: 16,
		width: 16,
		justifyContent: 'center',
		alignItems: 'center',

	},
	lineStyle: {
		borderWidth: 1,
		borderColor: '#09998c',
		width: width - 20,
		margin: 10,
		justifyContent: 'center',
		alignItems: 'center',

	},
	underlineStyle: {
		height: 40,
		borderTopColor: '#ffffff',
		borderBottomColor: 'black',
		borderLeftColor: '#ffffff',
		borderRightColor: '#ffffff',
		borderWidth: 0.5,
		marginBottom: 5,
		margin: 10,
	},
	avatar: {
		width: width / 3.5,
		height: width / 3.5,
		borderRadius: width / 7

	},
	oval: {
		width: width / 13,
		height: width / 13,



	},
	camera: {
		color: 'white',
		fontSize: width / 19,
		position: 'absolute'
	},
	cameracontainer: {
		position: 'absolute',

		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: width / 11,
		marginTop: width / 9

	},
	avatarcontainer: {
		position: 'absolute',

	},
	descriptionstyle: {
		fontSize: 12,
		marginLeft: 10,
		color: '#B3B3B3',
		marginTop: 20

	},
	resendStyle: {
		marginTop: 25,
		textAlign: 'center',
		fontSize: 15,
		color: 'blue'
	},
	buttonStyle: {
		marginTop: 20,
		width: width / 2,
		marginBottom: 20,
	},

	ImageContainer: {
		borderRadius: 10,
		width: 250,
		height: 250,
		borderColor: '#9B9B9B',
		borderWidth: 1 / PixelRatio.get(),
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#CDDC39',

	},
	proof: {
		width: width - 50,
		marginLeft: 25,
		justifyContent: 'center',
		alignItems: 'center',
		height: 120,
	}

});