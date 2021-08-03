import { Platfrom, Dimensions } from 'react-native'

const theme = 'YELLOW'    //BLUE or YELLOW

export default {
    theme: theme,
    dark: theme == 'BLUE' ? '#4C95B9' : '#FCB913',
    light: '',
    DevWidth: Dimensions.get('window').width,
    DevHeight: Dimensions.get('window').height,
    bg_color: '#f5f0e1',
    appVersion: '1.0',
    general_Token: '',
    Slider1: theme == 'YELLOW' ? require('../../assets/images/care1.png') : require('../../assets/images/care8.png'),
    Slider2: require("../../assets/images/care2.png"),
    Slider3: require("../../assets/images/care3.png"),
    // Slider4: require('../../assets/images/care4.png')

    // bg_color: '#EEF7EC'
}