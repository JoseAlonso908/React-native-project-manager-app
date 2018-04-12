import React from 'react';
import { AsyncStorage, View, Button, StyleSheet, Text, Image, Dimensions, TextInput, ScrollView, Picker } from 'react-native';
import { NavigationActions } from 'react-navigation';
import ButtonC from '../components/ButtonC';
var { width, height } = Dimensions.get('window')
import Server from '../provider/Server';

export default class DashboardAccept extends React.Component {

	static navigationOptions = {
		header: null
	};



	state = {
		language: 'English',
		api: new Server(),
		mobile: '',
		profile: {},
		amount: '',
		tncText: '',
		projectDescription: '',
		projectImageURL: {},
		welcomeMessage: '',
		sampleTaskDefinicationJSON: {},



	};




	componentWillMount() {

		AsyncStorage.getItem('profile', (err, res) => {
			let profile = JSON.parse(res)
			this.setState({ profile })

			console.log(profile)

			this.state.api.getRequest('/organization/get-t-n-c?orgId=' + profile.OrgId).then(tncText => {
				if (tncText) this.setState({ tncText });

			}).catch((err) => {
			
			})


			this.state.api.getRequest('/project/get-mobile-app-settings?projectId=' + profile.projectId).then(res => {
				if (res) this.setState({ projectDescription: res.projectDescription ? res.projectDescription : null, projectImageURL: res.projectImageURL ? { uri: res.projectImageURL } : {}, welcomeMessage: res.welcomeMessage ? res.welcomeMessage : null, sampleTaskDefinicationJSON: JSON.parse(res.sampleTaskDefinicationJSON ? res.sampleTaskDefinicationJSON : null) })
			
			}).catch((err) => {
			
			})

			this.state.api.getRequest('/participant/get-compensation-for-participant?participantId=' + profile.participantId).then(res => {
				if (res) this.setState({ amount: res.amount ? res.amount : '0' });

			}).catch((err) => {
			
			})



		})





	}
	handleNav = () => {

		this.props.navigation.dispatch(NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({ routeName: 'DashboardTab' })
			]
		}))

	}



	render() {
		const { navigate } = this.props.navigation;


		const pram = this.props.navigation.state;
		return (
			<ScrollView style={{ backgroundColor: '#fff' }}>
				<View style={{ flex: 1, justifyContent: 'flex-start' }}>
					<View>
						<Image style={styles.imagestyle} source={this.state.projectImageURL} />

						<View style={{ position: 'absolute', marginTop: 30, paddingHorizontal: 20 }}>
							<Image style={styles.logo} source={require('../assets/images/mobE_white.png')} />
							<Text style={{ color: 'white', lineHeight: 20, marginTop: 20 }}>{this.state.welcomeMessage}</Text>
						</View>
					</View>
				</View>

				<View style={styles.padding}>

					<Text style={{ color: '#000', fontSize: 20 }}>Project Goal</Text>

					<Text style={styles.padding}></Text>
					<Text style={styles.descriptionstyle}>
						{this.state.projectDescription}
					</Text>
					<Text style={styles.padding}></Text>

					<View>
						<Text style={styles.descriptionstyle}>

						</Text>
					</View>

					<Text style={styles.padding}>
					</Text>

					<View style={styles.lineStyle}></View>

					<Text style={styles.padding}>
					</Text>

					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<View>
							<Text style={styles.descriptionstyle}>
								Study Incentives
							</Text>
						</View>
						<View>
							<Text style={styles.numberstyle}>
								{this.state.amount}
							</Text>
						</View>
					</View>

					<Text style={styles.padding}></Text>
					<View style={styles.lineStyle}></View>

					<Text style={styles.padding}></Text>

					<View style={{ flexDirection: 'row' }}>
						<Text style={styles.descriptionstyle}>
							Accept the
						</Text>
						<Text style={styles.conditionclick} onPress={() => navigate('TermsConditions', { tncText: this.state.tncText })} >
							Terms and conditions
						</Text>

					</View>

					<Text style={styles.padding}></Text>
					<View style={styles.lineStyle}></View>

					<Text style={styles.padding}></Text>


					<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 100 }}>
						<View style={{ width: width / 2.3 }}>
							<Button disabled={true} title="REJECT" color="#05a5d1" onPress={() => { }} />
						</View>
						<View style={{ width: width / 2.3 }}>
							<ButtonC title="ACCEPT" onclick={this.handleNav} />
						</View>
					</View>


				</View>


			</ScrollView>
		)
	}
	handleUpload = () => {

	}

}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 0,

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
		borderWidth: 0.4,
		borderColor: '#09998c',


		justifyContent: 'center',
		alignItems: 'center',

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
		fontSize: 16,
		color: '#B3B3B3',
	},
	conditionclick: {
		textAlign: 'center',
		fontSize: 16,
		color: 'blue',
		marginLeft: 5
	},
	buttonStyle: {
		marginTop: 30,
		width: width / 2

	},
	outlinebutton: {
		borderWidth: 1,
		borderColor: '#09998c',
		width: width / 4,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white'


	},
	imagestyle: {
		width: width,
		height: width / 720 * 303,
		marginTop: 0

	},
	logo: {
		width: 30,
		height: 20,
	},
	padding: {
		padding: 10
	},
	numberstyle: {
		color: 'black',
		fontSize: 20

	}

});