import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import Config from '../../appConfig/Config'
import Fonts from '../../appConfig/Fonts';
import Button from '../../components/Button';
import { Stopwatch, Timer } from '../../components/react-native-stopwatch-timer'
import Sound from 'react-native-sound';
import { Dialog, ProgressDialog, ConfirmDialog } from "react-native-simple-dialogs";

export default function index(props) {
    const { code, testId } = props.route.params

    const [showUpload, setUpload] = useState(false)
    const [testcase, settestcase] = useState(false)
    const handleTimerComplete = () => { setUpload(true) };
    const [show, setShow] = useState(false)


    var whoosh = new Sound(require('../../../assets/AlarmTone.mp3'), (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
    });

    useEffect(() => {

        setTimeout(() => {
            if (!testcase) {
                whoosh.play((success) => {
                    if (!success) {
                        console.log('Sound did not play')
                    }
                    setShow(true);
                    whoosh.pause();
                })
            }
        }, 10000);
    }, [])


    const handleClose = () => {

        setShow(false);
        whoosh.pause();
        settestcase(true)
        // this.ResetAdFlow();
    }


    const options = {
        container: {

        },
        text: {
            fontSize: 22,
            color: '#FFF',
            fontFamily: Fonts.semi_bold
        }
    };
    const getFormattedTime = () => {

        //    const getFormattedTime = (time) => {
        //  this.currentTime = time;
    };
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ height: 120, width: 120, borderRadius: 60, backgroundColor: Config.dark, justifyContent: 'center', alignItems: 'center' }}>
                    <Timer
                        // totalDuration={900000}
                        totalDuration={10000}
                        start={true}
                        reset={false}
                        options={options}
                        handleFinish={handleTimerComplete}
                        getTime={getFormattedTime}
                    />
                </View>

            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end' }} >
                {showUpload &&
                    <Button Title='Upload' style={{ margin: 15 }}
                        onPress={() => props.navigation.navigate('covidtestkitscan', { code, testId })}
                    />}
            </View>
            {
                <Dialog

                    animationType="fade"
                    contentStyle={
                        {
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            borderRadius: 20,
                        }
                    }
                    onTouchOutside={() => handleClose()}
                    visible={show}
                >
                    <View>


                        <Text style={{ alignContent: "center", alignItems: "center", justifyContent: "center", color: '#000', fontSize: 20, textAlign: 'center', marginVertical: 20 }}>
                            ALERT
                        </Text>


                        <Text style={{ color: '#414141', marginTop: 10, fontSize: 16, marginBottom: 10, marginBottom: 40 }}>Capture Your Test Kit</Text>

                        <View>
                            <TouchableOpacity
                                style={{
                                    elevation: 5,
                                    backgroundColor: Config.dark,
                                    justifyContent: "center",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingHorizontal: 20,
                                    paddingVertical: 15,
                                    marginHorizontal: 3,
                                    borderRadius: 5,
                                }}
                                onPress={() => handleClose()}
                            >
                                <Text style={{ color: '#FFF', fontSize: 18 }}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Dialog>
            }
        </View>
    )
}

const styles = StyleSheet.create({})
