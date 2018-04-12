import React from 'react';
import { AsyncStorage, View, Button, StyleSheet, Text, Image, Dimensions, TextInput, ScrollView, Picker } from 'react-native';
var { width, height } = Dimensions.get('window')
import HTML from 'react-native-render-html';

export default class TermsConditionsScreen extends React.Component {


	state = {
		html: ''
	}
	static navigationOptions = {
		title: 'Terms & Conditions',
	};
	componentWillMount() {
		var { params } = this.props.navigation.state;
		console.log(params.tncText.tncText)

		let html = params.tncText.tncText;

		this.setState({ html });

	}
	render() {
		return (
			<ScrollView style={{ backgroundColor: '#fff' }}>
				<View style={{ marginLeft: 10, marginRight: 10, }} >
					<HTML html={this.state.html} imagesMaxWidth={Dimensions.get('window').width} />
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
		fontSize: 12,
		color: '#B3B3B3',
	},
	conditionclick: {
		textAlign: 'center',
		fontSize: 12,
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
	padding: {
		padding: 10
	},
	numberstyle: {
		color: 'black',
		fontSize: 20

	}

});