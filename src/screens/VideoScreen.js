import React, { Component } from 'react';

import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Button from '../components/Button';

//import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function VideoScreen(props) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, margin: 15 }}>
                <VideoPlayer
                    source={require('../../assets/Instructions.mp4')}
                    disableControlsAutoHide={false}
                    onBack={() => props.navigation.goBack()}
                />
            </View>


            <Button
                Title='Take Test'
                onPress={() => {
                    props.navigation.navigate('users')
                }}
                style={{ margin: 15 }}
            />
            {/* <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        props.navigation.navigate('users')
                    }}
                >
                    <Text>Take Test</Text>
                </TouchableOpacity> */}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    footer: {
        height: 100

    },

    button: {
        elevation: 5,
        backgroundColor: '#4C95B9',
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginHorizontal: 3,
        position: "absolute",
        left: 10,
        right: 10,
        bottom: 15,
        borderRadius: 5,
    },
})
