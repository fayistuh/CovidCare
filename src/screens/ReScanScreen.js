import React, { Component } from 'react';
import Header from '../components/Header'

import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

//import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default class ReScanScreen extends Component {

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    Title='Scan Details'
                    onPressBack={() => this.props.navigation.navigate('covidtestkitscan', { data: 'rescan' })}
                />
                <View style={{ flex: 1, alignItems: 'center', alignSelf: 'center', justifyContent: 'center', alignContent: 'center' }}>
                    <Text style={{ color: '#000', fontSize: 15 }}>Image Not Recognized, Re Scan to get Result</Text>

                </View>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.props.navigation.navigate('covidtestkitscan', { data: 'rescan' })
                        }}
                    >
                        <Text style={{ color: '#FFF', fontSize: 20 }}>Re Scan</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    footer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    button: {
        elevation: 5,
        backgroundColor: '#FCB913',
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginHorizontal: 3,
        position: "absolute",
        left: 10,
        right: 10,
        bottom: 10,
        borderRadius: 5,
    },
})