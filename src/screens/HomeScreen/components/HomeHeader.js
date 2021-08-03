import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import Config from '../../../appConfig/Config'
import Fonts from '../../../appConfig/Fonts'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import Geocoder from 'react-native-geocoder';
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';

function HomeHeader(props) {

    // const [location, setLocation] = useState('')
    // const [ value, setValue] = useState('')
  
    // useEffect(() => {
    //     // const getData = () => {
    //         Geolocation.getCurrentPosition(
    //         position => {
    //             const location = JSON.stringify(position);
    //             setLocation(location);
    //             let data = JSON.parse(location);
    //             const latitude = data.coords.latitude
    //             const longitude = data.coords.longitude
    //             getArea(latitude, longitude)
    //               console.log('Thu is a vamk', latitude, longitude)
    //         },
    //         error => Alert.alert(error.message),
    //         { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    //     );
    // // };
    
    // const getArea = async (latitude, longitude) => {
    //       Geocoder.fallbackToGoogle("AIzaSyDrTbBJakraXytn99yDNU7IKu2S60dXWHo")
    //       let lat = latitude;
    //       let lng = longitude;
    //       let ret = await Geocoder.geocodePosition({lat, lng});
    //       let value = ret[0].locality
    //       console.log('ret value ', value)
    //   setValue(value)
    //   }	
    //  },[]);

    const [position, setPosition] = useState(null)
	const [value, setValue] = useState(null)

	useEffect(() =>{
		Geolocation.getCurrentPosition(
			(position) => {
			const location = JSON.stringify(position);
            console.log('heri s avalue', location)
			setPosition(location)
			let data = JSON.parse(location);
			const latitude = data.coords.latitude
			const longitude = data.coords.longitude
			gerArea(latitude, longitude)
			}
		);

		const gerArea = async(latitude, longitude) =>  {
			Geocoder.fallbackToGoogle("AIzaSyDrTbBJakraXytn99yDNU7IKu2S60dXWHo");
			let lat = latitude;
			let lng = longitude;
			let ret = await Geocoder.geocodePosition({lat, lng});
			let Value = ret[0].locality
			setValue(Value);
            console.log('herei s a', Value)
		}	
	})
    
    return (
        <View style={{ height: 75, backgroundColor: 'white', elevation: 3 }}>
            <View style={{ height: 50, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={props.onPressBurger}
                    style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Feather name='menu' size={20} />
                </TouchableOpacity>
                <Text style={{ fontFamily: Fonts.bold, fontSize: 18, marginRight: 15, color: Config.dark }}>CovidTest</Text>
            </View>
            <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 15 }}>
                <MaterialIcon name='location-on' size={20} color={Config.dark} />
                <Text style={{ fontFamily: Fonts.regular, fontSize: 12 }}>{value}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({})

export default HomeHeader
