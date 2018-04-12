import React from 'react';
import { View, Button, StyleSheet, Text, Image, Dimensions, TextInput, ScrollView, Picker, Alert, AsyncStorage } from 'react-native';
import Server from '../../provider/Server';
import { Icon } from 'react-native-elements';

var { width, height } = Dimensions.get('window');

export default class Notification extends React.Component {

    state = {
        profile: {},
        unreadNotCntForPat: 0,
        unreadNotForPat: [],
        allNotForPat: [],
        api: new Server(),

    }

    componentWillMount() {


        AsyncStorage.getItem('profile', (err, res) => {

            let profile = JSON.parse(res)
            this.setState({ profile }, () => {
                this.getNotCnt()
                this.getNot()
                this.getAllNot()
            })

            console.log('profile:', profile)



        })
    }


    render() {
        const imageUrl = { uri: this.state.profile.profilePhotoURL }
        console.log(imageUrl);
        return (
            <ScrollView style={{ backgroundColor: '#fff' }} >
                <View style={{ backgroundColor: '#5ac8fa' }}>
                    <View style={styles.topstyle}>
                        <Text style={styles.unreadtextStyle}>
                            Notifications ({this.state.unreadNotCntForPat})
                         </Text>
                        <Icon style={{ justifyContent: 'flex-end' }} name='clear' color='black' size={35} />
                    </View>
                </View>

                <View style={styles.container}>
                    <View style={{marginRight:300}}>
                        <Text style={{ color: "#b3b3b3", fontSize:18 }}>Today</Text>
                        <Text></Text>
                    </View>
                    {/* (() => {
                        if(this.state.unreadNotCntForPat == '0')
                        return(<View><Text>HI</Text></View>)
                    })() */}
                    {this.state.allNotForPat.map((notis, index) => {
                        console.log(notis, index)
                        return (
                            <View key={"" + index} style={styles.slideContainer}>
                                <View>
                                    <View style={styles.slideStyle1}>
                                    </View>

                                    <View style={styles.crossStyle}>
                                    </View>
                                </View>
                                <Text style={styles.timeStyle}>{notis.submitTime.substring(11, 16)}</Text>

                                <View style={styles.content}>
                                    <Image style={styles.image} source={imageUrl} />
                                    <View style={styles.textBoxStyle} >
                                        <Text style={styles.textStyle}>{notis.message}</Text>
                                    </View>

                                </View>
                            </View>
                        )
                    })}
                    
                    
                    <Text></Text>
                    <Text></Text>
                    <View style={{marginRight:130,}}><Text style={{ color: "#b3b3b3", fontSize:18 }}>You have {} read notification </Text></View>
                    <Text></Text>
                    <Text></Text>
                </View>
            </ScrollView>
        )
    }

    getNotCnt() {

        this.state.api.getRequest('/participant/get-unread-notifications-count-for-participant?participantId=' + this.state.profile.participantId).then(unreadNotCntForPat => {
            this.setState({ unreadNotCntForPat: unreadNotCntForPat.unreadNotificationsCount })
        }).catch(err=>{
      
        })
    }
    getNot() {

        this.state.api.getRequest('/participant/get-unread-notifications-for-participant?participantId=' + this.state.profile.participantId).then(unreadNotForPat => {
            this.setState({ unreadNotForPat })
        }).catch(err=>{
      
        })
    }
    getAllNot() {

        this.state.api.getRequest('/participant/get-all-notificationss-for-participant?participantId=' + this.state.profile.participantId).then(allNotForPat => {
            this.setState({ allNotForPat })
        }).catch(err=>{
      
        })
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
        backgroundColor: '#B3B3B3',
        marginRight: 8,

    },

    crossStyle: {
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#D8D8D8',
        width: 3,
        height: 70,
        marginTop: 1,
        marginLeft: 6.5
    },
    slideContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: width / 6,
        height: width / 6,
    },
    content: {
        flexDirection: 'row',
        backgroundColor: "#cccfcd",
        paddingHorizontal: 16,
        paddingVertical: 16,
        width: width * 3 / 4,
        height: width / 6 + 20,
        marginTop: 5,

    },
    timeStyle: {
        fontSize: 12,
        color: "#8e8e93",
        marginRight: 8,
        marginBottom: 70,
    },

    textBoxStyle: {
        marginLeft: 10,
        width: 220,

    },
    textStyle: {
        color: '#000',
        fontSize: 14,
    },
    unreadtextStyle: {
        fontSize: 18,
        margin: 10,
        color: '#000',
        textAlign: 'center',
    },
    topstyle: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: 10
    },
    logostyle: {
        width: 50,
        height: 50,       
        flex: 0,       
        alignItems: 'center',
        justifyContent:'center'


    },
    logoback: {
        width: 50,
        height: 50,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 25,
        position:'absolute',


    },
    logoimage: {
        width: 30,
        height: 20,
        
    

    }



})