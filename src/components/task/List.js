import React from 'react';
import { View, Button, StyleSheet, Text, Image, Dimensions, TextInput, ScrollView, Picker, Alert, AsyncStorage } from 'react-native';

import ImageTask from './ImageTask';
import VideoTask from './VideoTask';
import AudioTask from './AudioTask';
import CommentRate from './CommentRate';
import RadioRate from './RadioRate';
import SelectRate from './SelectRate';
import SurveyRate from './SurveyRate';
import EmojiRate from './EmojiRate';
import StarRate from './StarRate';
import NodeRate from './NodeRate';
import NodeBigRate from './NodeBigRate';
import Server from '../../provider/Server';

import ProgressBar from '../ProgressBar'
var { width, height } = Dimensions.get('window');


export default class List extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			taskkind: 0,
			profile: {},
			projectImageURL: {},
			detail: '',
			lasttime: '',
			api: new Server(),
			mobile: '0987654321',
			tasklist: [],
			progressState: 0,

		}
	}

	componentWillMount() {
		AsyncStorage.getItem('mobile', (err, mobile) => {
			this.setState({ mobile })
			this.getstartdate()
			this.getdetail()
			this.sampletask()
		})

		AsyncStorage.getItem('profile', (err, response) => {
			let profile = JSON.parse(response)
			this.setState({ profile })

			this.state.api.getRequest('/project/get-mobile-app-settings?projectId=' + profile.projectId).then(res => {
				if (res) this.setState({ projectImageURL: res.projectImageURL ? { uri: res.projectImageURL } : require('../../assets/images/Dashtop.png') })

			}).catch((err) => {
			
			})



		})



	}


	render() {
		StartTask = () =>
			<View>
				<View style={{ justifyContent: 'center', alignItems: 'center', marginTop: height / 5 }}>
					<Text style={{ fontSize: 12, color: 'black' }}>Your study starts from</Text>
					<Text style={{ fontSize: 17, marginTop: 10 }}>{this.state.lasttime}</Text>
					<View style={{ flexDirection: 'row' }}>
						<Text>Check the </Text>
						<Text style={styles.sampleTaskStyle} onPress={this.sampletask.bind(this)}>Sample Task</Text>
					</View>
				</View>
			</View>
		HaveDone = () =>
			<View>
				<View style={{ justifyContent: 'center', alignItems: 'center', marginTop: height / 5 }}>
					<Text style={{ fontSize: 17, color: 'black' }}>You have done all the tasks</Text>
					<Text style={{ fontSize: 17, color: 'black' }}>We will inform you when there are tasks</Text>


				</View>
			</View>

		return (
			<View style={{ flex: 1, justifyContent: 'flex-start' }}>
				<View>
					<Image style={styles.imagestyle} source={this.state.projectImageURL} />

					<ProgressBar progressState={this.state.progressState} />

					<View style={{ position: 'absolute', marginTop: 30, paddingHorizontal: 20 }}>
						<Image style={styles.logo} source={require('../../assets/images/mobE_white.png')} />
						<Text style={{ color: 'white', lineHeight: 20, marginTop: 20 }}>{this.state.detail}</Text>
					</View>
				</View>

				{
					(() => {
						if (this.state.tasklist[this.state.taskkind] == null) return <HaveDone />;
						console.log(JSON.parse(this.state.tasklist[this.state.taskkind].definitionJSON).taskType)
						switch (JSON.parse(this.state.tasklist[this.state.taskkind].definitionJSON).taskType) {
							case 'media': {
								switch (JSON.parse(this.state.tasklist[this.state.taskkind].definitionJSON).mediaType) {
									case 'image':
										return <ImageTask tasknum={(index) => this.handleTaskkind(index)} task={this.state.tasklist[this.state.taskkind]} />
									case 'video':
										return <VideoTask tasknum={(index) => this.handleTaskkind(index)} task={this.state.tasklist[this.state.taskkind]} />
									case 'audio':
										return <AudioTask tasknum={(index) => this.handleTaskkind(index)} task={this.state.tasklist[this.state.taskkind]} />

								}
							}
							case 'text': return <CommentRate tasknum={(index) => this.handleTaskkind(index)} task={this.state.tasklist[this.state.taskkind]} />
							case 'multi select': return <SelectRate tasknum={(index) => this.handleTaskkind(index)} task={this.state.tasklist[this.state.taskkind]} />
							case 'single select': return <RadioRate tasknum={(index) => this.handleTaskkind(index)} task={this.state.tasklist[this.state.taskkind]} />
							case 'scale': {
								switch (JSON.parse(this.state.tasklist[this.state.taskkind].definitionJSON).scaleType) {
									case 'star':
										return <StarRate tasknum={(index) => this.handleTaskkind(index)} task={this.state.tasklist[this.state.taskkind]} />;
									case 'bar': {
										switch (JSON.parse(this.state.tasklist[this.state.taskkind].definitionJSON).maxSize) {
											case '10': return <NodeRate tasknum={(index) => this.handleTaskkind(index)} task={this.state.tasklist[this.state.taskkind]} />
											case '5': return <NodeBigRate tasknum={(index) => this.handleTaskkind(index)} task={this.state.tasklist[this.state.taskkind]} />
										}

									}
									case 'emoticons':
										return <EmojiRate tasknum={(index) => this.handleTaskkind(index)} task={this.state.tasklist[this.state.taskkind]} />;
								}
							}
							case 'survey': return <SurveyRate tasknum={(index) => this.handleTaskkind(index)} task={this.state.tasklist[this.state.taskkind]} />
							//default: return <StartTask />
						}
					})()
				}
			</View>
		)
	}
	handleTaskkind(index) {
		this.setState({ taskkind: this.state.taskkind + 1 }, () => {
			if (this.state.tasklist[this.state.taskkind] == null) return
			AsyncStorage.setItem('taskExecutionId', this.state.tasklist[this.state.taskkind].taskExecutionId)
		});

		setTimeout(() => {
			console.log(this.state.taskkind)
		}, 2000);
	}

	sampletask() {
		this.state.api.getRequest('/participant/get-participant-task-list?mobile=' + this.state.mobile).then(res => {
			this.setState({ tasklist: res });

		}).catch((err) => {
			
		})

	}
	getdetail() {
		this.state.api.getRequest('/participant/get-project-details-for-participant?mobile=' + this.state.mobile).then(res => {
			this.setState({ detail: res.name })
		}).catch((err) => {
			
		})


	}
	getstartdate() {
		this.state.api.getRequest('/participant/get-first-task-t-ime-for-participant?mobile=' + this.state.mobile).then(res => {
			this.setState({ lasttime: res.firstTaskDateTime })
		}).catch((err) => {
			
		})

	}
}

const styles = StyleSheet.create({
	logo: {
		width: 30,
		height: 20,
	},

	imagestyle: {
		width: width,
		height: width / 720 * 303,
		marginTop: 0,
		marginLeft: 0,
	},

	sampleTaskStyle: {
		textAlign: 'center',
		fontSize: 15,
		color: 'blue'
	},

	memoboard: {
		backgroundColor: 'yellow',
		width: width / 2,
		height: width / 2,
		marginLeft: width / 2.5,
		marginTop: 20,
		padding: 10,
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowRadius: 2,
		shadowOpacity: 1.0,
		elevation: 2,



	}
})