import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppContext from '../../appConfig/constant'
import { CommonActions } from '@react-navigation/native';



export default function inddex(props) {

    const { setAuthToken } = useContext(AppContext)
    useEffect(() => {
        getSyncInfo()
    }, [])

    const getSyncInfo = async () => {
        try {
            const value = await AsyncStorage.getItem('@userToken');
            const is_otp = await AsyncStorage.getItem('is_otp');
            const is_aadh = await AsyncStorage.getItem('is_aadh');
            //     if(value!==null && is_otp && is_aadh)
            //     {
            //         // userdata=JSON.parse(value).userToken
            //         console.warn('HAHAHA', JSON.parse(value).authToken)
            //         setAuthToken(JSON.parse(value).authToken)
            //         props.navigation.dispatch(
            //             CommonActions.reset({
            //                 index: 0,
            //                 routes: [

            //                     { name: 'home' },

            //                 ],
            //             })
            //         );
            // }
            if (is_otp == 'true') {

                if (value !== null) {
                    if (is_aadh == 'true') {
                        console.warn('HAHAHA', JSON.parse(value).authToken)
                        setAuthToken(JSON.parse(value).authToken)
                        props.navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [

                                    { name: 'home' },

                                ],
                            })
                        );
                    }
                    else {
                        props.navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [
                                    { name: 'adhar' },

                                ],
                            })
                        );

                    }
                }
                else {
                    props.navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                { name: 'onboard' },

                            ],
                        })
                    );

                }

            }
            else {
                props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'onboard' },

                        ],
                    })
                );
            }


        } catch (error) {
            // Error retrieving data
            console.warn('noooo', error)
            // Toast.show('Something went wrong')

        }
    }


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>SPLASH SCREEN</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
