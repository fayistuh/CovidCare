import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, Modal, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import Header from '../../components/Header'
import QrScanner from '../../components/QrScanner'
import API from '../../appConfig/api'
import Apiconstants from '../../appConfig/APIConstants'
import Snackbar from 'react-native-snackbar'
import moment from 'moment'
import UserCard from '../UsersScreen/components/UserCard'
import Fonts from '../../appConfig/Fonts'
import Config from '../../appConfig/Config'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Button from '../../components/Button'
import AppContext from '../../appConfig/constant'
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';

const WIDTH = Dimensions.get('window').width;


export default function index(props) {
    const { authToken } = useContext(AppContext)
    const { item } = props.route.params
    const [showmodal, setModal] = useState(false)
    const [vaccinationType, setVaccinationType] = useState()
    const [vaccinationdate, setVaccinationdate] = useState()


    const [type, setType] = useState(null)
    const [medicalHistory, setMedicalHistory] = useState(null)
    const [vaccineRecieved, setVaccineRecieved] = useState(null)
    const [testkitcode, setTestKitCode] = useState(null)
    const [calling, setCalling] = useState(false)
    const [shouldShow, setshouldShow] = useState(false)

    const VaccinationDeatils = (val) => {
        setVaccineRecieved(val)
        console.log('thin', val)
        if(val == "Yes") {
            setshouldShow(true)
        } else if(val == "No")
        {
            setshouldShow(false)
        } 
        return null
    }


    const registerTestKit = () => {
        setCalling(true)
        var data = new FormData();
        data.append('kit_id', testkitcode);
        data.append('subuser_id', item.subuser_id);
        data.append('authcode', authToken);
        data.append('vaccinated', vaccineRecieved == 'Yes' ? '1' : '0');
        data.append('medical_history', medicalHistory == 'Yes' ? '1' : '0');
        data.append('patient_type', type)
        data.append('vaccine_type', vaccinationType)
        data.append('vaccinated_date', vaccinationdate)
        console.warn(data)

        API(Apiconstants.REGISTER_TEST_KIT, data, "POST", null)
            .then((res) => {
                console.warn(res.data)
                if (res.data.code == 200) {
                    Snackbar.show({
                        duration: Snackbar.LENGTH_LONG,
                        text: "Test kit Registered Successfully",
                        backgroundColor: "green",
                    });
                    let testId = res.data.test_id
                    let code = testkitcode
                    props.navigation.navigate('test', { code, testId })
                }
                else {
                    Snackbar.show({
                        duration: Snackbar.LENGTH_LONG,
                        text: res.data.status,
                        backgroundColor: "red",
                    });

                }
                setCalling(false)
            })
            .catch((error) => {
                console.warn(error);

                Snackbar.show({
                    duration: Snackbar.LENGTH_LONG,
                    text: "Test kit Registration Failed",
                    backgroundColor: "red",
                });
                setCalling(false)



            });
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header
                Title='Patient Details'
                onPressBack={() => props.navigation.goBack()}
            />
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <UserCard Data={item} />
                    <View style={{ margin: 15 }}>
                        <Question
                            Title='Type'
                            options={['Symptomatic', 'Asymptomatic']}
                            selected={type}
                            onChangeValue={(val) => setType(val)}
                        />
                        <Question
                            Title='Medical History'
                            options={['Yes', 'No']}
                            selected={medicalHistory}
                            onChangeValue={(val) => setMedicalHistory(val)}
                        />
                        <Question
                            Title='Covid Vaccine received'
                            options={['Yes', 'No']}
                            selected={vaccineRecieved}
                            // onChangeValue={(val) => setVaccineRecieved(val)}
                            onChangeValue={VaccinationDeatils}
                        />

                        <View style={{ marginTop: 10 }}>
                            {
                                shouldShow ? (
                                    <View>
                            <View>
                                <Text style={styles.headFonts}>Select Vaccination Type</Text>
                                <View style={{borderWidth: 0.4, marginTop: 5, borderRadius: 10, color: 'gray',width:WIDTH-40}}>
                                    <Picker
                                        key={`vaccinationType`}
                                        style={[styles.picker, { marginHorizontal: 20, width: WIDTH - 70 }]}
                                        itemStyle={styles.pickerItem}
                                        selectedValue={vaccinationType}
                                        onValueChange={value => setVaccinationType(value)}
                                        >
                                        <Picker.Item key={"Covishield"} label={'Covishield'} value={'Covishield'} />
                                        <Picker.Item key={"Covaxin"} value={'Covaxin'} label={'Covaxin'} />
                                        <Picker.Item key={"Sputnik V"} value={'Sputnik V'} label={'Sputnik V'} />
                                    </Picker>
                                </View>
                            </View>

                            <View style={{ marginTop: 10 }}>
                            <Text style={styles.headFonts}>
                                    Vaccinated Date
                                </Text>
                                <View style={{borderWidth: 0.4, marginTop: 5, borderRadius: 10, color: 'gray',width:WIDTH-40}}>
                                <DatePicker
                                    style={{ width: WIDTH - 50, marginVertical: 5 , borderWidth:0}}
                                    date={vaccinationdate}
                                    mode="date"
                                    placeholder="Select Vaccinated Date"
                                    format="DD/MM/YYYY"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateInput: {
                                            borderWidth:0,
                                            marginLeft: -50,
                                            borderRadius: 4,
                                            borderColor: '#DFE6ED',
                                        },
                                        // ... You can check the source to find the other keys.
                                    }}
                                    onDateChange={fromDate => setVaccinationdate(fromDate)}
                                />
                                </View>
                            </View>
                            </View>
                            ) : null
                            }
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => setModal(true)}
                                    style={{ marginTop: 10 }}>
                                    <MaterialCommunityIcons name='qrcode-scan' size={40} />
                                </TouchableOpacity>
                                <Text style={{ marginLeft: 20, fontFamily: Fonts.regular, fontSize: 12, color: 'gray' }}>{testkitcode ? testkitcode : 'Scan the Qr code on the Test Kit'}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Button
                    Title='Continue'
                    style={{ margin: 15 }}
                    calling={calling}
                    onPress={() => {
                        if (testkitcode && medicalHistory && type && vaccineRecieved) {
                      //  if (medicalHistory && type && vaccineRecieved) {
                            registerTestKit()
                        }
                        else {
                            Snackbar.show({
                                duration: Snackbar.LENGTH_LONG,
                                text: 'All fields are Mandatory',
                                backgroundColor: "red",
                            });
                        }
                    }}
                />
            </View>
            <Modal
                visible={showmodal}
                animationType='fade'
                onRequestClose={() => setModal(false)}
            >
                <QrScanner
                    onReadSuccess={(code) => {
                        console.warn('CODE IS', code)
                        setTestKitCode(code)
                        // props.navigation.navigate('test', { code })
                        setModal(false)
                    }}
                    onClose={() => setModal(false)}
                />

            </Modal>

        </View>
    )
}

function Question(props) {
    return (
        <View style={{ marginTop: 15 }}>
            <Text style={{ fontFamily: Fonts.medium }}>{props.Title}</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                {props.options.map((item) =>
                    <View style={{ flexDirection: 'row', marginRight: 10 }}>
                        <TouchableOpacity
                            onPress={() => props.onChangeValue(item)}
                            style={{ height: 20, width: 20, borderRadius: 20, borderWidth: 2, marginRight: 5, borderColor: Config.dark, justifyContent: 'center', alignItems: 'center' }}>
                            {props.selected == item && <View style={{ height: 15, width: 15, borderRadius: 15, backgroundColor: Config.dark }} />}
                        </TouchableOpacity>
                        <Text style={{ fontFamily: Fonts.regular, fontSize: 12, color: 'gray' }}>{item}</Text>
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
