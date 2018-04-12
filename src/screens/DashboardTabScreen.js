import React from 'react';
import { AsyncStorage, View, Button, StyleSheet, Text, Image, Dimensions, TextInput, ScrollView, Picker } from 'react-native';
import { Icon } from 'react-native-elements';
import Tabs from 'react-native-tabs';

import Tabbar from 'react-native-tabbar-bottom';

import List from '../components/task/List';
import ChatHeader from '../components/chat/ChatHeader';
import Chat from '../components/chat/Chat';
import Notification from '../components/notification/Notification';
import Person from '../components/profile/Person';
import Server from '../provider/Server';


var { width, height } = Dimensions.get('window')

export default class DashboardTabScreen extends React.Component {
    static navigationOptions = {
        header: null
    };
    constructor() {
        super()
        this.state = {
            api: new Server(),
            page: "list",
            unreadNotCntForPat: null,
            profile: {}
        }
        AsyncStorage.getItem('profile', (err, res) => {

            let profile = JSON.parse(res)
            this.setState({ profile }, () => {
                this.getNotCnt()

            })

            console.log('profile:', profile)



        })
    }

    getNotCnt() {

        this.state.api.getRequest('/participant/get-unread-notifications-count-for-participant?participantId=' + this.state.profile.participantId).then(unreadNotCntForPat => {
            this.setState({ unreadNotCntForPat: unreadNotCntForPat.unreadNotificationsCount == 0 ? null : unreadNotCntForPat.unreadNotificationsCount})


        }).catch((err) => {
			
        })

    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.page === 'chat' && <ChatHeader />}

                {this.state.page === "list" && <List />}
                {this.state.page === "notifications" && <Notification />}
                {this.state.page === "chat" && <Chat />}
                {this.state.page === "person" && <Person navigation={this.props.navigation} />}

                <View style={{ height: 50 }}>
                </View>

                <Tabbar style={styles.tabiconStyle}
                    stateFunc={(tab) => {
                        this.setState({ page: tab.page })
                        if (tab.page == 'notifications') this.setState({ unreadNotCntForPat: 0 })
                        if (tab.page == 'chat') this.setState({ unreadNotCntForPat: 0 })
                        //this.props.navigation.setParams({tabTitle: tab.title})
                    }}
                    activePage={this.state.page}
                    tabs={[
                        {
                            page: "list",
                            icon: "list",
                        },
                        {
                            page: "notifications",
                            icon: "notifications",
                            badgeNumber: this.state.unreadNotCntForPat,
                        },
                        {
                            page: "chat",
                            icon: "chat",
                            badgeNumber: this.state.unreadNotCntForPat,
                        },
                        {
                            page: "person",
                            icon: "person",

                        }
                    ]}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        width: width
    },


    tabiconStyle: {
        borderBottomWidth: 5,
        borderBottomColor: 'green',

    }
});
