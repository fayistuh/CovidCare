import React, { useEffect, useState } from 'react';
import { View, Modal, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import PDFView from 'react-native-view-pdf'
import Config from '../appConfig/Config';
import Share from "react-native-share";

export default function pdfScreen({ navigation, route }) {
    const { pdfdata } = route.params
    // const [pdfData, setPdfData] = useState('')

    // useEffect(() => {
    //     setPdfData(true)
    //     var data = new FormData();
    //     // data.append('authcode', code);
    //     data.append('authcode', 'c8db156d7be4a86d397c35df73be2709');
    //     // data.append('test_id', testId)
    //     data.append('test_id', '1')
    //     console.log('data', data)
    //     // console.log('api', Apiconstants.GET_RESULT_PDF)
    //     API(Apiconstants.GET_RESULT_PDF, data, "POST", null)
    //         .then((res) => {
    //             setPdfData(res.data)
    //             console.log('value of pdf', res.data)
    //         }).catch((error) => {
    //             console.warn(error);
    //         });
    // },[])

    const resources = {
        // file: Platform.OS === 'ios' ? invoicePathIOS + ".pdf" : invoicePath,
        // url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        // url: 'https://docs.google.com/document/d/1_ySJbc7fSgjB9ipGhoBIx-mYZcQ2d8MpfavbYm8k7Ec/export?format=pdf',
        url: pdfdata,
        base64: 'JVBERi0xLjMKJcfs...',
    };

    const shareInvoice = async () => {
        Share.open({
            title: "TestReport ",
            message: "Message:",
            url: pdfdata,
            subject: "Report",
        })
            .then((res) => { console.warn(res) })
            .catch((err) => { console.warn('ERRR', err) });
    }

    return (

        <SafeAreaView style={{ flex: 1, }}>
            <PDFView
                fadeInDuration={250.0}
                style={{ flex: 1 }}
                // resource={resources.url!=undefined&&resources.url!=null?resources.url:null}
                resource={resources.url}
                resourceType={'url'}
                onLoad={() => console.warn(`PDF rendered from ${'url'}`)}
                onError={(error) => console.warn('Cannot render PDF', error)}
            />
            <View style={{ height: 50, flexDirection: 'row', margin: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}
                    style={{ flex: 2, backgroundColor: 'red', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
                    <Text style={{ fontFamily: Config.semi_bold, color: 'white' }}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => shareInvoice()}
                    style={{ flex: 1, backgroundColor: Config.dark, borderRadius: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={{ fontFamily: Config.semi_bold, color: 'white', marginHorizontal: 5 }}>share</Text>
                    {/* <Icon1 name='sharealt' size={20} color='white'/> */}
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}