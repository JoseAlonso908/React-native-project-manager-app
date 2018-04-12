import React from 'react';
import { KeyboardAvoidingView, AsyncStorage, View, Alert, Button, StyleSheet, Text, Image, Dimensions, TextInput, ScrollView, Picker } from 'react-native';
import { NavigationActions } from 'react-navigation';
import ButtonC from '../components/ButtonC';

var { width, height } = Dimensions.get('window')

export default class WalletsScreen extends React.Component {
	// state = {language:''}
	constructor(props) {
		super(props);
		this.state = { language: 'English' };
		this.state = { mobile: '' };
		this.state = { ewalletName: 'paytm' };
		this.state = { text: '' };


	}

	componentWillMount() {
		AsyncStorage.getItem('mobile', (err, mobile) => {
			this.setState({ mobile })
			console.log(mobile)
		})
		AsyncStorage.getItem('ewalletNumber', (err, ewalletNumber) => {
			response = JSON.parse(ewalletNumber);
			this.setState({text:response});
		})


	}

	handleNav = () => {
		if ( this.state.text == '') {
			alert("Please enter Patym details");
			return;
		} else {
			fetch('http://34.215.9.246:9000/api/participant/add-wallet-details', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					mobile: this.state.mobile,
					ewalletName: 'paytm',
					ewalletNumber: this.state.text,
				}),
			}).then((response) => {
				this.props.navigation.dispatch(NavigationActions.reset({
					index: 0,
					actions: [
						NavigationActions.navigate({ routeName: 'DashboardAccept' })
					]
				}))
			})
				.catch((error) => {
					console.error(error);
				});
		}


	}
	render() {

		const { navigate } = this.props.navigation;
		const pram = this.props.navigation.state;
		return (
			<KeyboardAvoidingView style={{ flex: 1 }}>
				<ScrollView style={{ backgroundColor: '#fff' }}>

					<View style={styles.container}>
						<Text>
							Review Details
						</Text>

						<View style={styles.slideContainer}>
							<View style={styles.slideStyle2}></View>
							<View style={styles.crossStyle}></View>
							<View style={styles.slideStyle1}></View>

						</View>
						<View style={styles.lineStyle}></View>

						<Text style={styles.headStyle}>
							How would you like to receive your reward?
						</Text>

						<View style={{ flexDirection: 'row', marginTop: 30 }}>
							<View style={{ width: width / 4 }}>
								<Button title="PAYTM" color="#0073ff" onPress={() => { }} />
							</View>
							<View style={styles.outlinebutton}>
								<Text>BANKS</Text>
							</View>
						</View>
					</View>
					<View style={{ padding: 10 }}>
						<Text style={styles.descriptionstyle}>
							Mobile no
						</Text>
						<TextInput
							style={{
								height: 40, marginLeft: 20,
								borderTopColor: '#ffffff',
								borderBottomColor: 'grey',
								borderLeftColor: '#ffffff',
								borderRightColor: '#ffffff',
								borderWidth: 0.8,
								marginBottom: 5,
								marginRight: 20,
							}}
							value={this.state.text}

							onChangeText={(text) => this.setState({ text })}

						/>

					</View>
					<View style={styles.container}>
						<View style={styles.buttonStyle}>
							<ButtonC title="THIS IS GOOD" onclick={this.handleNav} />
						</View>
					</View>


				</ScrollView>
			</ KeyboardAvoidingView>
		)
	}
	handleUpload = () => {

	}

}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
		backgroundColor: '#fff'
	},

	slideStyle1: {
		marginTop: 29,
		width: 16,
		height: 16,
		borderRadius: 16,
		backgroundColor: '#007AFF'


	},
	slideStyle2: {
		marginTop: 29,
		width: 16,
		height: 16,
		borderRadius: 16,
		backgroundColor: '#4CD964'


	},

	crossStyle: {
		marginTop: 29,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: '#D8D8D8',
		width: 64,
		height: 5,



	},
	slideContainer: {

		flexDirection: 'row',
		height: 16,
		width: 16,
		justifyContent: 'center',
		alignItems: 'center',

	},
	lineStyle: {
		marginTop: 28,
		borderWidth: 1,
		borderColor: '#EFEFF4',
		width: width - 20,
		justifyContent: 'center',
		alignItems: 'center',

	},
	headStyle: {
		marginTop: 24,
		// fontFamily: 'Poppins-Regular',
		fontSize: 14
	},
	avatar: {
		width: width / 3.5,
		height: width / 3.5,

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
		color: '#B3B3B3',
		marginTop: 50,
		marginLeft: 25
	},
	resendStyle: {
		textAlign: 'center',
		fontSize: 15,
		color: 'blue'
	},
	buttonStyle: {
		marginTop: 220,
		width: width / 2,


	},
	outlinebutton: {
		borderWidth: 1,
		borderColor: '#0073ff',
		width: width / 4,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white'


	}

});