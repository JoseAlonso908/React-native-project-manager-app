import React from 'react';
import { View, Button, StyleSheet, Text, Image, Dimensions, TextInput, ScrollView, Picker, Alert } from 'react-native';
import PropTypes from "prop-types";
import { Item } from 'native-base';


var { width, height } = Dimensions.get('window');

export default class ProgressBar extends React.Component {

    render() {
        return (
            <View>
                <View style={styles.mark}>
                    <View style={styles.dev7}>
                        <View style={styles.siderMarkAct}></View>
                    </View>
                    <View style={styles.dev7}>
                        <View style={styles.siderMarkAct}></View>
                    </View>
                    <View style={styles.dev7}>
                        <View style={styles.siderMarkAct}></View>
                    </View>
                    <View style={styles.dev7}>
                        <View style={styles.siderMarkAct}></View>
                    </View>
                    <View style={styles.dev7}>
                        <View style={styles.siderMarkNon}></View>
                    </View>
                    <View style={styles.dev7}>
                        <View style={styles.siderMarkNon}></View>
                    </View>
                    <View style={styles.dev7}>
                        <View style={styles.siderMarkNon}></View>
                    </View>

                </View>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.act}>
                            <View style={styles.sideborderAct}></View>
                        </View>

                        <View style={styles.dis}>
                            <View style={styles.sideborderAct}></View>
                        </View>
                        <View style={styles.dis}>
                            <View style={styles.sideborderAct}></View>
                        </View>
                        <View style={styles.dis}>
                            <View style={styles.sideborderAct}></View>
                        </View>
                        <View style={styles.non}>
                            <View style={styles.sideborderNon}></View>
                        </View>
                        <View style={styles.non}>
                            <View style={styles.sideborderNon}></View>
                        </View>
                        <View style={styles.non}>
                            <View style={styles.sideborderNon}></View>
                        </View>
                    </View>
                </View>

            </View>
        )
    }



}
const styles = StyleSheet.create({
    container: {
        width: width,
        height: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',

    },
    act: {
        width: width / 7,
        height: 5,
        backgroundColor: 'rgba(0,255, 0, 1)',

    },
    dis: {
        width: width / 7,
        height: 5,
        backgroundColor: 'rgba(255,0, 0, 1)',

    },
    non: {
        width: width / 7,
        height: 5,
        backgroundColor: 'rgba(0,0, 0, 0)',

    },
    sideborderAct: {
        width: 2,
        height: 5,
        marginLeft: width / 7 - 2,
        backgroundColor: 'rgba(255,255, 255, 1)',
        zIndex: 9
    },
    sideborderNon: {
        width: 2,
        height: 5,
        marginLeft: width / 7 - 2,
        backgroundColor: 'rgba(255,255, 255, 0.4)'
    },
    mark: {
        width: width,
        height: 6,
        marginTop: -11,
        flexDirection: 'row',

    },
    siderMarkAct: {
        borderRadius: 3,
        width: 6,
        height: 6,
        marginLeft: width / 7 - 4,
        backgroundColor: 'rgba(255,255, 255, 1)',
    },
    siderMarkNon: {
        borderRadius: 3,
        width: 6,
        height: 6,
        marginLeft: width / 7 - 4,
        backgroundColor: 'rgba(255,255, 255, 0.4)',
    },
    dev7: {
        width: width / 7
    }



})

