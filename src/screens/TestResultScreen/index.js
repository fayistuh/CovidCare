import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, ScrollView, Modal, TouchableOpacity, BackHandler, Platform } from 'react-native'
import FastImage from 'react-native-fast-image'
import Config from '../../appConfig/Config'
import Fonts from '../../appConfig/Fonts'
import Header from '../../components/Header'
import RNHTMLtoPDF from '../../components/react-native-html-to-pdf';
import { request, PERMISSIONS } from 'react-native-permissions';
import PDFView from 'react-native-view-pdf'
import Button from '../../components/Button'
import Share from "react-native-share";
import AppContext from '../../appConfig/constant'
import API from '../../appConfig/api'
import Apiconstants from '../../appConfig/APIConstants'

// const dataURL = "http://covec.ddns.net:5000/api/tests/get_result_pdf"

export default function index(props) {
    const { userDetials } = useContext(AppContext)
    const { testImage, covidTestKitScanDetails, code, testId } = props.route.params

    const [invoicePath, setInvoicePath] = useState(null)
    const [invoicePathIOS, setInvoicePathIOS] = useState()

    const [invoiceModal, setInvoiceModal] = useState(false)
    const [pdfValue, setPdfValue] = useState(null)
    // useEffect(() => {
    //     console.warn(testImage)
    // }, [])


    const checkPermission = () => {
        if (Platform.OS == 'android') {
            request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((result) => {
                if (result == 'granted') {
                    console.warn(result)
                    genarateReport()
                }
                else {
                    console.warn(result)
                }

            });
        }
        else {
            genarateReport()
        }
    }

    useEffect(() => {
        // setPdfValue(true)
        var data = new FormData();
        // data.append('authcode', code);
        data.append('authcode', 'c8db156d7be4a86d397c35df73be2709');
        // data.append('test_id', testId)
        data.append('test_id', '1')
        console.log('data', data)
        // console.log('api', Apiconstants.GET_RESULT_PDF)
        API(Apiconstants.GET_RESULT_PDF, data, "POST", null)
            .then((res) => {
                setPdfValue(res.data)
                console.log('value of pdf', res.data)
            }).catch((error) => {
                console.warn(error);
            });
    }, false);


    useEffect(() => {
        if (props.navigation.isFocused()) {
            const backAction = () => {
                props.navigation.navigate('home')
                return true;
            };

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => backHandler.remove();
        }
        else false
    }, []);

    const genarateReport = async () => {

        var inVoice = `
        <!DOCTYPE html>  
        <html>  
            <head>  
                <style>  
                /*Internal CSS using element name*/  
                        body{background-color:'white';  
                        text-align: center;}  
                        h2{font-style: italic;  
                        font-size: 30px;  
                        color: #f08080;}  
                        p{font-size: 20px;}  
                    /*Internal CSS using class name*/  
                        .blue{color: blue;}  
                        .red{color: red;}  
                        .green{color: green;}  
                </style>  
            </head>  
            <body>  
            <h2>Learning HTML with internal CSS</h2>  
                <p class="blue">Covid Test Report</p>  
                <p class="red">This is a red color paragraph</p>  
                <p class="green">This is a green color paragraph</p>  
            </body>  
        </html>  
        `

        const options = {
            html: inVoice,
            fileName: 'CovidTestReport',
            directory: 'Documents',
            // bgColor: '#E6E6E6',
            height: '100%'
        };

        const file = await RNHTMLtoPDF.convert(options)
        // console.log(file.filePath);
        setInvoicePath(file.filePath)

        setInvoiceModal(true)


        console.log('PDF PATH', file.filePath)
    }


    const resourceType = 'url';
    const resources = {
        // file: Platform.OS === 'ios' ? invoicePathIOS + ".pdf" : invoicePath,
        // url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        // url: 'https://docs.google.com/document/d/1_ySJbc7fSgjB9ipGhoBIx-mYZcQ2d8MpfavbYm8k7Ec/export?format=pdf',
        url: pdfValue,
        base64: 'JVBERi0xLjMKJcfs...',
    };

    const shareInvoice = async () => {
        Share.open({
            title: "TestReport ",
            message: "Message:",
            url: pdfValue,
            subject: "Report",
        })
            .then((res) => { console.warn(res) })
            .catch((err) => { console.warn('ERRR') });
    }


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header
                onPressBack={() => props.navigation.navigate('home')}
            />
            <ScrollView contentContainerStyle={{ paddingHorizontal: 15 }}>
                <View style={{ height: 200, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontFamily: Fonts.regular, color: Config.dark }}>Test Result</Text>
                        {/* <Text style={{ fontFamily: Fonts.regular, color: '#D21111', fontSize: 25 }}>{covidTestKitScanDetails.result}</Text> */}
                    </View>
                    <FastImage
                        source={{ uri: testImage }}
                        // source={{ uri: '' }}
                        style={{ height: 100, width: 100, borderRadius: 10, backgroundColor: '#E6E6E6' }}
                    />
                </View>

                <View style={{ justifyContent: 'space-between', marginTop: 20 }}>
                    <View>
                        <Text style={styles.headFonts}>KIT Number</Text>
                        <Text style={styles.dataFont}>{code}</Text>
                        {/* <Text style={styles.dataFont}>72611</Text> */}
                    </View>
                    {/* <View>
                        <Text style={styles.headFonts}>Name</Text>
                        <Text style={styles.dataFont}>{userDetials.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.headFonts}>Date of Birth</Text>
                        <Text style={styles.dataFont}>{userDetials.Birth_date}</Text>
                    </View>
                    <View>
                        <Text style={styles.headFonts}>Aadhar Number</Text>
                        <Text style={styles.dataFont}>{userDetials.uId}</Text>
                    </View> */}
                </View>
            </ScrollView>
            <Button
                Title='Re Scan'
                style={{ margin: 15 }}
                onPress={() =>
                    props.navigation.navigate('covidtestkitscan')
                }
            />

            <Button
                calling={pdfValue ? false : true}
                Title='Download Report'
                style={{ margin: 15 }}
                onPress={() => {
                    checkPermission()
                }}
            />
            <Modal visible={invoiceModal} animationType='slide' onRequestClose={() => setInvoiceModal(false)}>
                <View style={{ flex: 1, }}>
                    <PDFView
                        fadeInDuration={250.0}
                        style={{ flex: 1 }}
                        resource={resources['url']}
                        resourceType={resourceType}
                        // onLoad={() => console.warn(`PDF rendered from ${resources.url}`)}
                        onError={(error) => console.warn('Cannot render PDF', error)}
                    />
                    <View style={{ height: 50, flexDirection: 'row', margin: 10 }}>
                        <TouchableOpacity onPress={() => setInvoiceModal(false)}
                            style={{ flex: 2, backgroundColor: 'red', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
                            <Text style={{ fontFamily: Config.semi_bold, color: 'white' }}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => shareInvoice()}
                            style={{ flex: 1, backgroundColor: Config.dark, borderRadius: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ fontFamily: Config.semi_bold, color: 'white', marginHorizontal: 5 }}>share</Text>
                            {/* <Icon1 name='sharealt' size={20} color='white'/> */}
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    headFonts: {
        fontSize: 18,
        fontFamily: Fonts.regular,
        color: '#232323'
    },
    dataFont: {
        fontFamily: Fonts.medium,
        fontSize: 20
    }
})
