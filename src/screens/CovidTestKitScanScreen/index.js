import React, { useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DocumentScanner from '../../components/DocumentScannerWithCrop'
import API from '../../appConfig/api'
import Apiconstants from '../../appConfig/APIConstants'
import Button from '../../components/Button'
import Snackbar from "react-native-snackbar";


import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/Header';
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function CovidTestKitScanScreen({ navigation, route }) {
   const { code, testId } = route.params;
    // const code = 100;
    // const testId =110;


    const [covidTestKitScanDetails, setCovidTestKitScanDetails] = useState(null)
    const [calling, setCalling] = useState(false)



    return (
        <View style={{ flex: 1 }}>
            <DocumentScanner
                TestResult
                TestID={testId}
                onFailureAdharRequest={(res, testImage)=>{
                    // navigation.navigate('ReScanScreen');
                    navigation.navigate('testresult', { covidTestKitScanDetails, testImage, code, testId })
                }}
                onSuccessAdharRequest={(res, testImage) => {
                    setCovidTestKitScanDetails(res)
                    var covidTestKitScanDetails = res
                    console.warn('TEST IMAGE IS', testImage)
                    console.log('------------------Test Result------------Sugan-----------'+JSON.stringify(res))
                    if(res.code===400)
                    {
                        Snackbar.show({
                            duration: Snackbar.LENGTH_LONG,
                            text: "Image is not recognisable",
                            backgroundColor: "red",
                        });
                        // navigation.navigate('covidtestkitscan');
                        navigation.navigate('testresult', { covidTestKitScanDetails, testImage, code, testId })
                    }
                    else
                    {
                    navigation.navigate('testresult', { covidTestKitScanDetails, testImage, code, testId })
                    }   
                    console.warn(res)
                }}
                onSuccessAdharRequest={(res, testImage) => {
                    setCovidTestKitScanDetails(res)
                    var covidTestKitScanDetails = res
                    console.warn('TEST IMAGE IS', testImage)
                    console.log('------------------Test Result------------Sugan-----------'+JSON.stringify(res))
                    if(res.code===400)
                    {
                        Snackbar.show({
                            duration: Snackbar.LENGTH_LONG,
                            text: "Image is not recognisable",
                            backgroundColor: "red",
                        });
                        // navigation.navigate('covidtestkitscan');
                        navigation.navigate('testresult', { covidTestKitScanDetails, testImage, code, testId })
                    }
                    else
                    {
                    navigation.navigate('testresult', { covidTestKitScanDetails, testImage, code, testId })
                    }   
                    console.warn(res)
                }}
                initialImageIs={(image) => {
                    console.warn(image)
                    // setTestImage(image)
                }}
                onChangeAdhar={() => {
                    setCovidTestKitScanDetails(null)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    text1: {
        fontSize: 22,
        paddingLeft: 20,
        color: '#1A1A1A'
    },

    text2: {
        fontSize: 15,
        paddingLeft: 20,
        color: '#141414'
    },

    inputBox: {
        height: 50,
        borderWidth: 0.7,
        margin: 20,
        borderColor: '#2E2E2E',
        borderRadius: 10,
        color: '#000',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    InputMobileNumber: {
        color: '#000',
        marginLeft: 10

    },
    buttonContent: {

    },

    iconStyle: {
        height: 50,
        marginTop: 20,
        marginLeft: 15
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
        bottom: 15,
        borderRadius: 5,
    },

    buttonContent: {
        fontSize: 18,
        color: '#FFF'
    },
})
